#!/bin/bash

while true; do
    # Terminate existing npm processes if any
    pkill -f "node.*server.js"
    pkill -f "webpack-dev-server"

    # Start server npm process in the background
    (cd ./server && npm start &)

    # Start client npm process in the background
    (cd ./client && npm run dev &)

    # Wait for user input to restart the processes
    read -p "Press Enter to restart the processes..."
done

