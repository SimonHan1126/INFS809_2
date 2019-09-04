const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

/*
test in python:
from requests import post
import json
r = post(url="http://127.0.0.1:5000/users/add/", headers={u'content-type': u'application/json'}, data=json.dumps({"username":"ben"}))
 */

module.exports = router;
