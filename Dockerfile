# Use the official Node.js image
FROM node:16

# Install MySQL client
RUN apt-get update && \
    apt-get install -y default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /application

# Copy package.json and package-lock.json
COPY ./backend/package.json ./backend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./backend .

# Start the application
CMD ["npm", "start"]
