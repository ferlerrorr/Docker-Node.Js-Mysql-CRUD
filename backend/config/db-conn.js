const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "mysql-mycrud",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "mypass",
  database: process.env.DB_NAME || "my_crud",
});

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = connection;
