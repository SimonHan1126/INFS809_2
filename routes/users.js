const router = require("express").Router();
let User = require("../models/user.model");

/**
 * Defines route to find a list of users
 * Created by Ben Dagnin
 */
router.route("/users").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

/**
 * Defines a route to add a user to the database
 * Created by Ben Dagnin
 */
router.route("/add").post((req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    console.log("this user.js add username " + username + " password " + password);
  const newUser = new User({ username, password });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

/*
 * Defines a route to find a user and check their username and password matches
 * Checks there is a usernames and password present which match
 * Created by James Hughes
 */
router.route("/auth").get((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("this user.js add username " + username + " password " + password);
    User.find({ username: { $exists: true }, password: { $exists: true } })
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
