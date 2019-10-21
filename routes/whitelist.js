const router = require("express").Router();
let Whitelist = require("../models/whitelist.model");

/**
 * Created by Simon
 */

router.post("/findOne", (req, res) => {

    console.log("findOne req.body" + JSON.stringify(req.body));
    console.log("findOne req.body.username " + req.body.username);
    Whitelist.findOne({username: req.body.username})
        .then(function (data) {
            if(!data)
            {
                data = {"err" : "Error: username does not exist in whistlist"};
            }

            res.json(data);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
    console.log("this is whitelist add")

    Whitelist.findOne({username: req.body.username})
        .then(function (data) {
            if(!data)
            {
                const whitelist = new Whitelist({
                    username: req.body.username
                });
                console.log("this is whitelist add " + req.body.username)
                whitelist
                    .save()
                    .then(function (data) {
                        res.json(data);
                    })
                    .catch(function (err) {
                        console.log("this is whitelist err " + err)
                        res.status(400).json({ message: err });
                    });
            }
            else
            {
                res.json(data);
            }
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;