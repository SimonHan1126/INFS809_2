/**
 * Reposition routing files
 * Created by James Hughes
 * */
const router = require("express").Router();
const Article = require("../models/article.model");

/**
 * Defines a route for adding a new paper
 * MODERATOR ACCESSIBLE ONLY!!!
 * Created by James Hughes modified by Ben Dagnin
 */
router.post("/", async (req, res) => {
  const article = new Article({
    source: req.body.source,
    author: req.body.author,
    title: req.body.title,
    publisher: req.body.publisher,
    journal: req.body.journal,
    date: req.body.date,
    volume: req.body.volume,
    number: req.body.number,
    pagestart: req.body.pagestart,
    pageend: req.body.pageend,
    doi: req.body.doi,
    field: req.body.field
  });

  console.log(article);

  try {
    const savedArticle = await article.save();
    res.json(savedArticle);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

/**
 * Gets the full list of references from mongoDB
 * Created by James Hughes
 */
router.get("/", (req, res) => {
  Article.find()
    .then(repo => res.json(Article))
    .catch(err => res.status(400).json("Error: " + err));
});

/**
 * Get a specific article by id
 * Created by Ben Dagnin
 */
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    req.json(article);
  } catch (err) {
    req.status(400).json({ message: err });
  }
});

module.exports = router;
