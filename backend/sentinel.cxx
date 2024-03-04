#define _XOPEN_SOURCE 500

#include <array>
#include <cerrno>
#include <chrono>
#include <cstdlib>
#include <filesystem>
#include <fstream>
#include <ftw.h>
#include <iostream>
#include <map>
#include <sstream>
#include <sys/inotify.h>
#include <thread>
#include <unistd.h>
#include <utility>
#include <zmq.hpp>

namespace fs = std::filesystem;

constexpr int buffer_len = 8192;
constexpr int max_dirs = 2048;
constexpr int event_size = sizeof(struct inotify_event);
// constexpr int buffer_len = 2048 * (event_size + 16);

auto clear_screen() -> void {
  const char *clear_screen_ansi = "\e[1;1H\e[2J";
  constexpr int num_bytes_to_write = 11;
  write(STDOUT_FILENO, clear_screen_ansi, num_bytes_to_write);
}

class DirectoryWatcher {
  int dir_count = 0;
  int file_descriptor = inotify_init1(IN_NONBLOCK);
  std::array<char *, buffer_len> buf
      __attribute__((aligned(__alignof__(struct inotify_event))));

  ssize_t length = 0;
  std::chrono::seconds thread_timeout_len{1};
  std::string env_path;
  std::string watch_dir;
  std::array<char *, max_dirs> watched_dirs;
  std::array<int, max_dirs> dir_watches;
  zmq::context_t context{1};
  zmq::socket_t socket{context, zmq::socket_type::pub};

public:
  explicit DirectoryWatcher(std::string path) : env_path{std::move(path)} {
    watch_dir = get_watch_dir();
    if (file_descriptor == -1) {
      perror("inotify_init1");
      std::quick_exit(EXIT_FAILURE);
    }
    add_watches();
    establish_publisher_service();
    health_check();
  }
  ~DirectoryWatcher() {
    for (int j = 0; j < this->dir_count; ++j) {
      inotify_rm_watch(file_descriptor, dir_watches[j]);
    }
    close(file_descriptor);
    socket.close();
    context.close();
  }

  auto execute_event_loop() -> void {
    const struct inotify_event *event{nullptr};
    for (;;) {
      length = read(file_descriptor, &buf, sizeof(buf));
      if (length == -1 && errno != EAGAIN) {
        perror("read");
        std::quick_exit(EXIT_FAILURE);
      }

      /*
      If the nonblocking read() found no events to read, then
      it returns -1 with errno set to EAGAIN. In that case,
      we wait and then try again.
      */
      if (length <= 0 && errno == EAGAIN) {
        std::this_thread::sleep_for(thread_timeout_len);
        continue;
      }

      /* Loop over all events in the buffer. */
      for (char **ptr = buf.data(); ptr < buf.data() + length;
           ptr += sizeof(struct inotify_event) + event->len) {
        event = reinterpret_cast<const struct inotify_event *>(ptr);
        std::string event_type;
        std::string event_dir = get_event_dir(event);
        auto event_mask = static_cast<int>(event->mask);
        auto file_name = std::string(event->name);

        /* Event Types */
        bool creation_event = static_cast<bool>(event->mask & IN_CREATE);
        bool modify_event = static_cast<bool>(event->mask & IN_MODIFY);
        bool delete_event = static_cast<bool>(event->mask & IN_DELETE);

        if (creation_event) {
          event_type = "CREATE";
        } else if (modify_event) {
          event_type = "MODIFY";
        } else if (delete_event) {
          event_type = "DELETE";
        }

        std::string event_msg = event_dir;
        event_msg += '/';
        event_msg += file_name;
        event_msg += ',';
        event_msg += event_type;

        socket.send(zmq::buffer(event_msg), zmq::send_flags::none);
        std::cout << "publishing msg: " << event_msg << '\n';
        // }
      }
    }
  }

private:
  /*
    This function returns the directory path in the form of a std::string
    from an inotify event.
  */
  auto get_event_dir(const inotify_event *event) const -> std::string {
    std::string event_dir;
    for (int j = 0; j < this->dir_count; ++j) {
      if (event->wd == dir_watches[j]) {
        return watched_dirs[j];
      }
    }
    return "";
  }

  /*
    This function is called by nftw() for each file and directory in the tree
    starting at the directory specified in the first argument. The function
    adds watches for each directory encountered, and counts the number of
    directories encountered.
  */
  auto add_watch(const char *fpath, int typeflag) -> int {
    if (typeflag == FTW_D) {
      if (this->dir_count >= max_dirs) {
        fprintf(stderr, "Maximum directory count reached, not watching: %s\n",
                fpath);
        return 0;
      }

      int watch_descriptor = inotify_add_watch(
          file_descriptor, fpath, IN_MODIFY | IN_CREATE | IN_DELETE);

      if (watch_descriptor == -1) {

        switch (errno) {
        case EACCES:
          fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
                  "Permission denied");
          break;
        case EBADF:
          fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
                  "File descriptor not valid");
          break;
        case EEXIST:
          fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
                  "File watcher already exists");
          break;
        case EFAULT:
          fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
                  "Buffer is outside accessible address space");
          break;
        case EINVAL:
          fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
                  "Invalid event mask");
          break;
        case ENAMETOOLONG:
          fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
                  "File name is too long");
          break;
        case ENOENT:
          fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
                  "File does not exist");
          break;
        case ENOMEM:
          fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
                  "Insufficient kernel memory");
          break;
        case ENOSPC:
          fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
                  "No space left on device");
          break;
        case ENOTDIR:
          fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
                  "File is not a directory");
          break;
        default:
          fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
                  "Unknown error");
        }
        return EXIT_FAILURE;
      }
      watched_dirs[this->dir_count] = strdup(fpath);
      dir_watches[this->dir_count] = watch_descriptor;
      this->dir_count++;
    }
    return EXIT_SUCCESS;
  }

  /*
    This function returns the directory path in the form of a std::string
  */
  auto get_watch_dir() -> std::string {
    std::map env_variables = parse_env(this->env_path);
    auto docs_path = env_variables["DOCS_PATH"];
    std::string cur_dir = std::filesystem::current_path().string();
    return cur_dir + docs_path;
  }

  auto establish_publisher_service() -> void {
    printf("Creating publisher service...");
    socket.bind("tcp://*:8096");
    printf("established!\n\n");
  }

  auto add_watches() -> void {
    for (auto const &dir_entry : fs::recursive_directory_iterator(watch_dir)) {
      if (dir_entry.is_directory()) {
        add_watch(dir_entry.path().c_str(), FTW_D);
      }
    }
  }

  auto health_check() -> void {
    std::this_thread::sleep_for(thread_timeout_len);
    std::cout << "========================================================="
              << '\n';
    auto alive_message =
        "Sentinel is healthy and watching the following directory: " +
        watch_dir;
    printf("Sentinel is healthy and watching the following directory:\n");
    std::cout << watch_dir << '\n';
    std::cout << "=========================================================\n"
              << '\n';
    socket.send(zmq::buffer("HEALTH_CHECK" + alive_message),
                zmq::send_flags::none);
  }

  static auto parse_env(const std::string &env_file_name)
      -> std::map<std::string, std::string> {
    std::map<std::string, std::string> env_map;
    std::ifstream file(env_file_name);
    std::string line;

    while (std::getline(file, line)) {
      std::istringstream line_stream(line);
      std::string key;
      std::string value;

      if (std::getline(line_stream, key, '=') &&
          std::getline(line_stream, value)) {
        env_map[key] = value;
      }
    }

    return env_map;
  }
};

auto main() -> int {
  clear_screen();

  std::cout << '\n';
  std::cout << ".oPYo.                o   o              8" << '\n';
  std::cout << "8                     8                  8" << '\n';
  std::cout << "`Yooo. .oPYo. odYo.  o8P o8 odYo. .oPYo. 8" << '\n';
  std::cout << "    `8 8oooo8 8' `8   8   8 8' `8 8oooo8 8" << '\n';
  std::cout << "     8 8.     8   8   8   8 8   8 8.     8" << '\n';
  std::cout << "`YooP' `Yooo' 8   8   8   8 8   8 `Yooo' 8" << '\n';

  DirectoryWatcher watcher{"./.env"};
  watcher.execute_event_loop();

  return EXIT_SUCCESS;
}
