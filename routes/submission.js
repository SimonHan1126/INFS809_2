/**
 * Reposition routing files to a review list
 * Created by James Hughes
 **/
const router = require("express").Router();
const Article = require("../models/article.model");

/**
 * Used to post into a temporary repository
 * Created by James Hughes
 */
router.post("/post", (req, res) => {
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

module.exports = router;