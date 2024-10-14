#!/bin/bash

# Check if nodemon is installed
if ! nodemon --version > /dev/null 2>&1; then
    echo "Node dependencies not found. Installing."
    npm install -g nodemon
    npm install cors --save
else
    echo "Node dependencies found. Proceeding"
fi

# Function to check if MySQL is ready
check_mysql_ready() {
    # Try to connect to MySQL until it's ready
    until mysql -h mysql-mycrud -u root -p'mypass' -e "SELECT 1"; do
        echo "Waiting for MySQL to be ready..."
        sleep 5
    done
    echo "MySQL is ready!"
}

# Sleep for 20 seconds as a workaround for DB readiness
sleep 20

# Check if MySQL is ready
check_mysql_ready

# Change the MySQL root password
change_mysql_root_password

# Run the application
nodemon /app.js

# If the app did not start correctly, retry after another 20 seconds
if [ $? -gt 0 ]; then
    echo "A problem occurred running app.js. Let's wait 20 seconds and try once more! (Probably database not ready!)..."
    sleep 20
    nodemon /app.js
fi
