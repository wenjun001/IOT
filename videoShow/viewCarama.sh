#!/bin/bash
source /opt/ros/kinetic/setup.bash
rosrun image_view image_view image:=/webcam/image_raw _autosize:=true _window_name:="Room Carema"