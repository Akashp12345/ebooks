#!/bin/bash

# Variables
APP_DIR="/home/ubuntu/ebooks"
BRANCH="main"

# Navigate to the app directory
cd $APP_DIR

# Pull the latest changes from the repository
git pull origin $BRANCH

# Install dependencies
sudo service nginx restart