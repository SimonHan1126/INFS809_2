const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    doi: { type: String, required: false },
    address: { type: String, required: false },
    annote: { type: String, required: false },
    booktitle: { type: String, required: false },
    chapter: { type: String, required: false },
    crossref: { type: String, required: false },
    edition: { type: String, required: false },
    editor: { type: String, required: false },
    howpublished: { type: String, required: false },
    institution: { type: String, required: false },
    journal: { type: String, required: false },
    key: { type: String, required: false },
    note: { type: String, required: false },
    number: { type: String, required: false },
    organization: { type: String, required: false },
    pages: { type: String, required: false },
    publisher: { type: String, required: false },
    school: { type: String, required: false },
    series: { type: String, required: false },
    type: { type: String, required: false },
    volume: { type: String, required: false },
    year: { type: String, required: false },
    month: { type: String, required: false }
  },

  {
    timestamps: true
  }
);

ArticleSchema.index({ "$**": "text" });

module.exports = mongoose.model("Article", ArticleSchema);
