#define _XOPEN_SOURCE 500
#include <stdio.h>
#include <stdlib.h>
#include <sys/inotify.h>
#include <unistd.h>
#include <string.h>
#include <errno.h>
#include <limits.h>
#include <ftw.h>
#include <zmq.h>
#include <assert.h>

#define EVENT_SIZE  ( sizeof (struct inotify_event) )
#define BUF_LEN     ( 1024 * ( EVENT_SIZE + 16 ) )
#define MAX_DIRS    8096

int fd;
FILE *log_file;
char *watched_dirs[MAX_DIRS];
int wd[MAX_DIRS];
int dir_count = 0;

void clearScreen() {
  const char *CLEAR_SCREEN_ANSI = "\e[1;1H\e[2J";
  write(STDOUT_FILENO, CLEAR_SCREEN_ANSI, 11);
}

int add_watch(const char *fpath, const struct stat *sb, int typeflag, struct FTW *ftwbuf) {
    if (typeflag == FTW_D) {
        if (dir_count >= MAX_DIRS) {
            fprintf(stderr, "TEMaximum directory count reached, not watching: %s\n", fpath);
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
    return 0; // Continue traversing directories
}

int main(void) {
    printf("Initiating filewatch service\n");

    char buffer[BUF_LEN];

    printf("Establishing connection with Python service...");
    //  Socket to talk to clients
    void *context = zmq_ctx_new();
    void *requester = zmq_socket(context, ZMQ_REQ);
    int connect_status = zmq_connect(requester, "tcp://localhost:13000");
    assert(connect_status == 0);
    printf("established!\n");

    // File to log changes
    printf("Creating log file...");
    log_file = fopen("./logfile.txt", "a");
    if (!log_file) {
        perror("fopen");
        exit(EXIT_FAILURE);
    }
    printf("created!\n");

    printf("Starting inotify...");
    fd = inotify_init();
    if (fd < 0) {
        perror("inotify_init");
        exit(EXIT_FAILURE);
    }
    printf("initialized!\n");

    printf("Begin watch service...");
    if (nftw(".", add_watch, 20, 0) == -1) {
        perror("nftw");
        exit(EXIT_FAILURE);
    }
    printf("started!\n");

    clearScreen();
    char cwd[PATH_MAX];
    if (getcwd(cwd, sizeof(cwd)) != NULL) {
       printf("Filewatcher is watching for changes in the following dir: %s\n", cwd);
    } else {
        perror("getcwd() error");
        return 1;
    }

    // ==================================
    int request_nbr;
    for (request_nbr = 0; request_nbr != 10; request_nbr++) {
        char buffer [10];
        printf("Sending Hello %d…\n", request_nbr);
        zmq_send(requester, "Hello", 5, 0);
        sleep(1);
        printf("Hey");
        zmq_recv(requester, buffer, 10, 0);
        printf ("Received World %d\n", request_nbr);
    }
    zmq_close (requester);
    zmq_ctx_destroy (context);
    // ==================================


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
                if (event->mask & IN_CREATE || event->mask & IN_MODIFY || event->mask & IN_DELETE) {
                    // Check if the event is not for the log file itself
                    if (strcmp(event->name, "logfile.txt") != 0) {
                        fprintf(stdout, "File: %s\n", event->name);
                        fprintf(log_file, "Event: %s on file: %s\n", 
                                (event->mask & IN_CREATE) ? "CREATE" : 
                                (event->mask & IN_MODIFY) ? "MODIFY" : "DELETE", 
                                event->name);
                        fflush(log_file);
                    }
                }
            }
            i += EVENT_SIZE + event->len;
        }
    }

    // Clean up (this part of the code is not reached in normal operation)
    for (int j = 0; j < dir_count; ++j) {
        inotify_rm_watch(fd, wd[j]);
        free(watched_dirs[j]);
    }
    close(fd);
    fclose(log_file);

    return 0;
}

