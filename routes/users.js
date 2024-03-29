const router = require("express").Router();
let User = require("../models/user.model");

/**
 * Defines route to find a list of users
 * Created by Ben Dagnin
 */

router.post("/users", (req, res) => {
    User.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json({ message: err });
        });
});


/**
 * Defines a route to add a user to the database
 * Created by Ben Dagnin
 */
router.route("/add").post((req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    console.log("this user.js add username " + username + " password " + password);

    User.findOne({"username":username,"password":password})
    // .then(users => res.json(users))
        .then(function (data) {
            if(!data)
            {
                const newUser = new User({ username, password });
                newUser
                    .save()
                    .then(() => res.json("User added!"))
                    // .catch(err => res.status(400).json("Error: " + err)
                    .catch(function (err) {

                        console.log("this is err " + err);
                        res.status(400).json("Error: " + err);
                    });
            }
            else
            {
                res.json("User exist! Please login!");
            }
        });


});

/*
 * Defines a route to find a user and check their username and password matches
 * Checks there is a usernames and password present which match
 * Created by James Hughes
 */
router.route("/auth").post((req, res) => {
    const username = req.body.params.username;
    const password = req.body.params.password;

    User.findOne({"username":username,"password":password})
    // .then(users => res.json(users))
        .then(function (data) {
            if(!data)
            {
                data = {"err" : "Error: username does not exist or wrong password"};
            }

            res.json(data);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/islogin").post((req, res) => {

    const username = req.body.params.username;

    User.findOne({"username":username})
    // .then(users => res.json(users))
        .then(function (data) {
            if(!data)
            {
                data = {"err" : "Error: username does not exist"};
            }

            res.json(data);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
