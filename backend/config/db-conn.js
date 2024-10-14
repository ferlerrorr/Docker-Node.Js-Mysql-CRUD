const mysql = require("mysql2"); // Changed from mysql to mysql2

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "mysql-mycrud", // Use 'mysql-mycrud' by default
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "mypass",
  database: process.env.DB_NAME || "my_crud",
  // Optional: set the connection to use mysql_native_password if needed
  authPlugins: { mysql_native_password: () => () => null },
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});
