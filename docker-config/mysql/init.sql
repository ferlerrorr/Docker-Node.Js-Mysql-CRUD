-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS my_crud;

-- Use the created database
USE my_crud;

-- Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
	id int(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username varchar(150) NOT NULL,
    password varchar(150) NOT NULL,
    name varchar(150) NOT NULL,
    email varchar(150) NOT NULL,
    type varchar(50) NOT NULL,
    active boolean DEFAULT false
);

-- Grant root access from any host
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'mypass' WITH GRANT OPTION;

-- Refresh privileges
FLUSH PRIVILEGES;
