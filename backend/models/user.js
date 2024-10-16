const conn = require("../config/db-conn.js");

const User = function (user) {
  this.id = user.id;
  this.username = user.username;
  this.password = user.password;
  this.name = user.name;
  this.email = user.email;
  this.active = user.active;
};

User.createUser = (newUser, result) => {
  conn.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getById = (userId, result) => {
  conn.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAllUsers = (result) => {
  conn.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  conn.query(
    "UPDATE users SET username = ?, password = ?, type = ?, email = ?, name = ?, active = ? WHERE id = ?",
    [
      user.username,
      user.password,
      user.type,
      user.email,
      user.name,
      user.active,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  conn.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  conn.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

// Method to check for duplicate username or email
User.checkDuplicate = (username, email, result) => {
  // Query to find users with the specified username or email
  const query = "SELECT * FROM users WHERE username = ? OR email = ?";

  // Execute the query with the provided parameters
  conn.query(query, [username, email], (err, queryResult) => {
    // Handle any database query errors
    if (err) {
      console.error("Database query error: ", err);
      result(err, null); // Pass the error back to the callback
      return;
    }

    // Check if any duplicates were found
    if (queryResult.length > 0) {
      // Duplicates found, return the user data
      console.log("Duplicate user found: ", queryResult);
      result(null, queryResult); // Return the found duplicates
      return;
    }

    // No duplicates found, return an empty result
    result(null, []); // Indicate that no duplicates were found
  });
};

module.exports = User;
