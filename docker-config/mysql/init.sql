-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS my_crud;

-- Use the created database
USE my_crud;

CREATE TABLE IF NOT EXISTS users (
    id INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(150) NOT NULL UNIQUE, -- Ensure usernames are unique
    password VARCHAR(150) NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE, -- Ensure email addresses are unique
    active BOOLEAN DEFAULT 1 -- Set active default to 1 (TRUE)
);


-- Create the root user if it doesn't exist (optional)
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY 'mypass';

-- Grant privileges to the root user on the my_crud database
GRANT ALL PRIVILEGES ON my_crud.* TO 'root'@'%' WITH GRANT OPTION;

-- Refresh privileges
FLUSH PRIVILEGES;
