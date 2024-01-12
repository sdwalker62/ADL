#define _XOPEN_SOURCE 500
#include <sys/inotify.h>
#include <errno.h>
#include <ftw.h>
#include <zmq.hpp>
#include <assert.h>
#include <iostream>
#include <chrono>
#include <thread>
#include <map>
#include <sstream>
#include <fstream>
#include <filesystem>
#include <boost/uuid/uuid.hpp>
#include <boost/uuid/uuid_generators.hpp>
#include <fmt/format.h>


#define EVENT_SIZE  ( sizeof (struct inotify_event) )
#define BUF_LEN     ( 1024 * ( EVENT_SIZE + 16 ) )
#define MAX_DIRS    8096

int fd;
char *watched_dirs[MAX_DIRS];
int wd[MAX_DIRS];
int dir_count = 0;

using namespace std::chrono_literals;


std::map<std::string, std::string> parse_env(const std::string& env_file_name) {
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


int add_watch(const char *fpath, const struct stat *sb, int typeflag, struct FTW *ftwbuf) {
    if (typeflag == FTW_D) {
        if (dir_count >= MAX_DIRS) {
            fprintf(stderr, "Maximum directory count reached, not watching: %s\n", fpath);
            return 0;
        }

        wd[dir_count] = inotify_add_watch(fd, fpath, IN_MODIFY | IN_CREATE | IN_DELETE);
        if (wd[dir_count] == -1) {
            fprintf(stderr, "Cannot watch directory %s: %s\n", fpath, strerror(errno));
        } else {
            watched_dirs[dir_count] = strdup(fpath);
            dir_count++;
        }
    }
    return 0;
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

    char buffer[BUF_LEN];
    fd = inotify_init();
    if (fd < 0) {
        perror("inotify_init");
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

    std::this_thread::sleep_for(1s);
    std::cout << "=========================================================" << std::endl;
    auto alive_message = "Sentinel is healthy and watching the following directory: " + watch_dir;
    printf("Sentinel is healthy and watching the following directory:\n");
    std::cout << watch_dir << std::endl;
    std::cout << "=========================================================\n" << std::endl;
    socket.send(zmq::buffer("HEALTH_CHECK" + alive_message), zmq::send_flags::none);

    while (1) {
        int length = read(fd, buffer, BUF_LEN);
        if (length < 0) {
            perror("read");
            exit(EXIT_FAILURE);
        }

        int i = 0;
        while (i < length) {
            struct inotify_event *event = (struct inotify_event *)&buffer[i];
            if (event->len) {
                std::string event_dir {""};
                for (int j = 0; j < dir_count; ++j) {
                    if (event->wd == wd[j]) {
                        event_dir = watched_dirs[j];
                    }
                }
                auto file_name = std::string(event->name);
                if (event->mask & IN_CREATE || event->mask & IN_MODIFY || event->mask & IN_DELETE) {
                    std::string event_type;
                    if (event->mask & IN_CREATE) {
                        event_type = "CREATE";
                    } else if (event->mask & IN_MODIFY) {
                        event_type = "MODIFY";
                    } else if (event->mask & IN_DELETE) {
                        event_type = "DELETE";
                    }
                std::string event_msg = fmt::format("{}/{},{}", event_dir, file_name, event_type);
                socket.send(zmq::buffer(event_msg), zmq::send_flags::none);
                std::cout << event_msg << std::endl;
                }
            }
            i += EVENT_SIZE + event->len;
        }
    }

    for (int j = 0; j < dir_count; ++j) {
        inotify_rm_watch(fd, wd[j]);
        free(watched_dirs[j]);
    }
    close(fd);
    socket.close();
    context.close();

    return 0;
}
