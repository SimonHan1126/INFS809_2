/**
 * Reposition routing files
 * Created by James Hughes
 * */
const router = require("express").Router();
const Article = require("../models/article.model");
const base64Util = require("../util/base64Util");
const bibTexUtil = require("../util/bibTexUtil");

/**
 * Defines a route for adding a new paper
 * MODERATOR ACCESSIBLE ONLY!!!
 * Created by James Hughes modified by Ben Dagnin
 */
router.post("/post", (req, res) => {

  var bibTexString = base64Util.getInstance().decode(req.body.params.bibTex);
  var bibTexObject = bibTexUtil.getInstance().parseBibTexString(bibTexString);

  const article = new Article({
    address: bibTexObject.address,
    annote: bibTexObject.annote,
    author: bibTexObject.author,
    booktitle: bibTexObject.booktitle,
    chapter: bibTexObject.chapter,
    crossref: bibTexObject.crossref,
    doi: bibTexObject.doi,
    edition: bibTexObject.edition,
    editor: bibTexObject.editor,
    howpublished: bibTexObject.howpublished,
    institution: bibTexObject.institution,
    journal: bibTexObject.journal,
    key: bibTexObject.key,
    month: bibTexObject.month,
    note: bibTexObject.note,
    number: bibTexObject.number,
    organization: bibTexObject.organization,
    pages: bibTexObject.pages,
    publisher: bibTexObject.publisher,
    school: bibTexObject.school,
    series: bibTexObject.series,
    title: bibTexObject.title,
    type: bibTexObject.type,
    volume: bibTexObject.volume,
    year: bibTexObject.year
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
  var id = req.body._id;
  console.log("this get sp article by id " + id);
  Article.findById(id)
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
