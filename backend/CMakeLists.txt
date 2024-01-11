cmake_minimum_required(VERSION 3.26)
project(filewatcher VERSION 1.0)


set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

find_library(ZeroMQ zmq REQUIRED)

add_executable(filewatcher)

target_link_libraries(filewatcher PRIVATE zmq)

target_include_directories(filewatcher PRIVATE include)
target_sources(filewatcher PRIVATE filewatcher.cxx)


