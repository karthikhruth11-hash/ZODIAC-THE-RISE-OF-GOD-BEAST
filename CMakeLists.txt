# ==============================================================================
# ZODIAC: RISE OF THE GOD BEAST — CMAKE C++ MASTER BUILD CONFIGURATION
# Language: CMake / C++17
# Copyright (c) 2026 ZODIAC Game Studio. All Rights Reserved.
# ==============================================================================

cmake_minimum_required(VERSION 3.14)
project(ZodiacNativeEngine VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(server)

# 1. Native Physics Static Library
add_library(ZodiacPhysics STATIC
    server/zodiac_physics.cpp
    server/zodiac_physics.h
)

# 2. Native C++ Dedicated Game Server Executable
add_executable(zodiac_dedicated_server
    server/dedicated_server.cpp
)
target_link_libraries(zodiac_dedicated_server PRIVATE ZodiacPhysics)

# 3. Native C++ Matchmaking Server Executable
add_executable(zodiac_matchmaking_server
    server/matchmaking_server.cpp
)

message(STATUS "ZODIAC Native C++17 Engine Targets Configured Successfully.")
