#define _XOPEN_SOURCE 500
#include <chrono>
#include <errno.h>
#include <filesystem>
#include <fstream>
#include <ftw.h>
#include <iostream>
#include <map>
#include <sstream>
#include <sys/inotify.h>
#include <thread>
#include <unistd.h>
#include <zmq.hpp>

#define EVENT_SIZE (sizeof(struct inotify_event))
#define BUF_LEN (1024 * (EVENT_SIZE + 16))
#define MAX_DIRS 2048

int fd;
char *watched_dirs[MAX_DIRS];
int wd[MAX_DIRS];
int dir_count = 0;

// using namespace std::chrono_literals;

std::map<std::string, std::string> parse_env(const std::string &env_file_name) {
  std::map<std::string, std::string> env_map;
  std::ifstream file(env_file_name);
  std::string line;

  while (std::getline(file, line)) {
    std::istringstream lineStream(line);
    std::string key, value;

    if (std::getline(lineStream, key, '=') && std::getline(lineStream, value)) {
      env_map[key] = value;
    }
  }

  return env_map;
}

void clearScreen() {
  const char *CLEAR_SCREEN_ANSI = "\e[1;1H\e[2J";
  write(STDOUT_FILENO, CLEAR_SCREEN_ANSI, 11);
}

int add_watch(const char *fpath, const struct stat *sb, int typeflag,
              struct FTW *ftwbuf) {
  if (typeflag == FTW_D) {
    if (dir_count >= MAX_DIRS) {
      fprintf(stderr, "Maximum directory count reached, not watching: %s\n",
              fpath);
      return 0;
    }

    wd[dir_count] =
        inotify_add_watch(fd, fpath, IN_MODIFY | IN_CREATE | IN_DELETE);
    if (wd[dir_count] == -1) {
      fprintf(stderr, "Cannot watch directory %s: %s\n", fpath,
              strerror(errno));
    } else {
      watched_dirs[dir_count] = strdup(fpath);
      dir_count++;
    }
  }
  return 0;
}

std::string get_watch_dir(const inotify_event *event) {
  std::string event_dir{""};

  for (int j = 0; j < dir_count; ++j) {
    if (event->wd == wd[j]) {
      event_dir = watched_dirs[j];
    }
  }
  return event_dir;
}

int main(void) {
  clearScreen();

  std::cout << std::endl;
  std::cout << ".oPYo.                o   o              8" << std::endl;
  std::cout << "8                     8                  8" << std::endl;
  std::cout << "`Yooo. .oPYo. odYo.  o8P o8 odYo. .oPYo. 8" << std::endl;
  std::cout << "    `8 8oooo8 8' `8   8   8 8' `8 8oooo8 8" << std::endl;
  std::cout << "     8 8.     8   8   8   8 8   8 8.     8" << std::endl;
  std::cout << "`YooP' `Yooo' 8   8   8   8 8   8 `Yooo' 8" << std::endl;
  std::cout << ":.....::.....:..::..::..::....::..:.....:." << std::endl;
  std::cout << "::::::::::::::::::::::::::::::::::::::::::" << std::endl;
  std::cout << "::::::::::::::::::::::::::::::::::::::::::" << std::endl;

  /*
  Some systems cannot read integer variables if they are not
  properly aligned. On other systems, incorrect alignment may
  decrease performance. Hence, the buffer used for reading from
  the inotify file descriptor should have the same alignment as
  struct inotify_event.
  */
  char buf[4096] __attribute__((aligned(__alignof__(struct inotify_event))));
  ssize_t length;
  std::chrono::seconds thread_timeout_len{1};

  /* Create the file descriptor for accessing the inotify API. */
  /* inotify_init1() is similar to inotify_init() but accepts a flags argument.
   */
  fd = inotify_init1(IN_NONBLOCK);
  if (fd == -1) {
    perror("inotify_init1");
    exit(EXIT_FAILURE);
  }

  // Get paths from environment variables
  std::map env_variables = parse_env(".env");
  auto docs_path = env_variables["DOCS_PATH"];
  std::string cur_dir = std::filesystem::current_path().string();
  auto watch_dir = cur_dir + docs_path;

  const char *char_dir = watch_dir.c_str();
  if (nftw(char_dir, add_watch, 20, 0) == -1) {
    perror("nftw");
    exit(EXIT_FAILURE);
  }

  printf("Creating publisher service...");
  zmq::context_t context{1};
  zmq::socket_t socket{context, zmq::socket_type::pub};
  socket.bind("tcp://*:8096");
  printf("established!\n\n");

  std::this_thread::sleep_for(thread_timeout_len);
  std::cout << "========================================================="
            << std::endl;
  auto alive_message =
      "Sentinel is healthy and watching the following directory: " + watch_dir;
  printf("Sentinel is healthy and watching the following directory:\n");
  std::cout << watch_dir << std::endl;
  std::cout << "=========================================================\n"
            << std::endl;
  socket.send(zmq::buffer("HEALTH_CHECK" + alive_message),
              zmq::send_flags::none);

  /* Loop while events can be read from inotify file descriptor. */
  const struct inotify_event *event;
  for (;;) {
    length = read(fd, buf, sizeof(buf));
    if (length == -1 && errno != EAGAIN) {
      perror("read");
      exit(EXIT_FAILURE);
    }

    /*
    If the nonblocking read() found no events to read, then
    it returns -1 with errno set to EAGAIN. In that case,
    we wait and then try again.
    */
    if (length <= 0) {
      if (errno == EAGAIN) {
        std::this_thread::sleep_for(thread_timeout_len);
        continue;
      } else {
        perror("read");
        exit(EXIT_FAILURE);
      }
    }

    /* Loop over all events in the buffer. */
    for (char *ptr = buf; ptr < buf + length;
         ptr += sizeof(struct inotify_event) + event->len) {
      event = (const struct inotify_event *)ptr;
      std::string event_dir = get_watch_dir(event);
      auto file_name = std::string(event->name);
      if (event->mask & IN_CREATE || event->mask & IN_MODIFY ||
          event->mask & IN_DELETE) {
        std::string event_type;
        if (event->mask & IN_CREATE) {
          event_type = "CREATE";
        } else if (event->mask & IN_MODIFY) {
          event_type = "MODIFY";
        } else if (event->mask & IN_DELETE) {
          event_type = "DELETE";
        }
        std::string event_msg = event_dir + "/" + file_name + "," + event_type;
        socket.send(zmq::buffer(event_msg), zmq::send_flags::none);
        std::cout << "publishing msg: " << event_msg << std::endl;
      }
    }
  }

  for (int j = 0; j < dir_count; ++j) {
    inotify_rm_watch(fd, wd[j]);
    free(watched_dirs[j]);
  }
  close(fd);
  socket.close();
  context.close();
  return EXIT_SUCCESS;
}
