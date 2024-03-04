cmake_minimum_required(VERSION 3.22)
project(sentinel VERSION 1.0)


set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

find_library(ZeroMQ zmq REQUIRED)
find_package(fmt)
set(Boost_USE_STATIC_LIBS OFF) 
set(Boost_USE_MULTITHREADED ON)  
set(Boost_USE_STATIC_RUNTIME OFF) 


add_executable(sentinel)




target_link_libraries(sentinel PRIVATE zmq fmt::fmt)

target_include_directories(sentinel PRIVATE include)
target_sources(sentinel PRIVATE sentinel.cxx)


