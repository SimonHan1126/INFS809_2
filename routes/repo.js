/**
 * Reposition routing files
 * Created by James Hughes
 * */
const router = require("express").Router();
let Repo = require("../models/repo.model");

/**
 * Defines a route for adding a new paper
 * MODERATOR ACCESSIBLE ONLY!!!
 * Created by James Hughes
 */
router.route("/add").post((req, res) => {
    const papername = req.body.papername;
    const pubdate = req.body.pubdatel;
    const journal = req.body.journal;
    const bibloref = req.body.bibloref;
    const authors = req.body.authors;
    const field = req.body.field;
    const newPaper = new Repo({ papername, pubdate, journal, bibloref, authors, field });

    newPaper
        .save()
        .then(() => res.json("Paper reference added"))
        .catch(err => res.status(400).json("Error: " + err));
});

/**
 * Gets the full list of references from mongoDB
 * Created by James Hughes
 */
router.route("/list").get((req, res) => {
    Repo.find()
        .then(repo => res.json(repo))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;