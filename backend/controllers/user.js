const User = require("../models/user.js");
const crypto = require("crypto");

//* Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  // Check for duplicate username or email
  User.checkDuplicate(req.body.username, req.body.email, (err, queryResult) => {
    if (err) {
      return res
        .status(500)
        .send({ message: err.message || "Error checking duplicates." }); // Handle error
    }

    const duplicateFields = queryResult
      .flatMap((user) => [
        user.username === req.body.username && "username",
        user.email === req.body.email && "email",
      ])
      .filter(Boolean);

    if (duplicateFields.length > 0) {
      return res.status(400).send({
        message: `Duplicate found for: ${duplicateFields.join(", ")}`,
      });
    }

    // Hash the password using SHA-256
    const hash = crypto.createHash("sha256"); // Create a hash object
    const hashedPassword = hash.update(req.body.password).digest("hex"); // Hash the password and convert to hex

    // Create a User
    const user = new User({
      username: req.body.username,
      password: hashedPassword, // Store the hashed password
      name: req.body.name,
      email: req.body.email,
    });

    // Save User in the database
    User.createUser(user, (err, data) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      }
      res.send(data); // Successfully created user
    });
  });
};

//* Retrieve all Users from the database.
exports.getAll = (req, res) => {
  // User.getAllUsers((err, data) => {
  //   if (err)
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while retrieving users.",
  //     });
  //   else res.send(data);
  // });
  res.send("ok");
};

//* Find a single User with a userId
exports.get = (req, res) => {
  User.getById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

//* Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

//* Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

//* Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
