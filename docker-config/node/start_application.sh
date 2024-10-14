#!/bin/bash

# Check if nodemon is installed
if ! nodemon --version > /dev/null 2>&1; then
    echo "Node dependencies not found. Installing."
    npm install -g nodemon
    npm install cors --save
else
    echo "Node dependencies found. Proceeding"
fi

# Run the application
nodemon app.js

# If the app did not start correctly, retry after another 20 seconds
if [ $? -gt 0 ]; then
    echo "A problem occurred running app.js. Let's wait 20 seconds and try once more! (Probably database not ready!)..."
    sleep 20
    nodemon app.js
fi
