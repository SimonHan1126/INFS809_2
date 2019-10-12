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
router.post("/", (req, res) => {
  console.log(req);
  const article = new Article({
    address: req.body.address,
    annote: req.body.annote,
    author: req.body.author,
    booktitle: req.body.booktitle,
    chapter: req.body.chapter,
    crossref: req.body.crossref,
    doi: req.body.doi,
    edition: req.body.edition,
    editor: req.body.editor,
    howpublished: req.body.howpublished,
    institution: req.body.institution,
    journal: req.body.journal,
    key: req.body.key,
    month: req.body.month,
    note: req.body.note,
    number: req.body.number,
    organization: req.body.organization,
    pages: req.body.pages,
    publisher: req.body.publisher,
    school: req.body.school,
    series: req.body.series,
    title: req.body.title,
    type: req.body.type,
    volume: req.body.volume,
    year: req.body.year
  });

  console.log(article);

  article
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
});

/**
 * Gets the full list of references from mongoDB
 * Created by James Hughes
 */
router.get("/", (req, res) => {
  Article.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
});

/**
 * Get a specific article by id
 * Created by Ben Dagnin
 */
router.get("/:id", (req, res) => {
  Article.findById(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
});

/**
 * Allows searching articles through the API
 */
router.post("/search", (req, res) => {
  /**
   * https://mongoosejs.com/docs/api.html#model_Model.find
   *
   * // executes, name LIKE john and only selecting the "name" and "friends" fields
   * MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })
   */
  Article.find(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
  //res.json(req.body);
});

module.exports = router;
