cmake_minimum_required(VERSION 3.15)
set(CMAKE_C_STANDARD 11)
project(filewatcher C)

find_library(ZeroMQ zmq REQUIRED)

add_executable(filewatcher)
target_link_libraries(filewatcher PRIVATE zmq)

target_include_directories(filewatcher PRIVATE include)
target_sources(filewatcher PRIVATE filewatcher.c)