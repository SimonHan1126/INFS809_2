/**
 * Model class for Article (eg: journal article, book, ect) in the database as per "SDM INFS809 Assignment 2 Supporting Documentation Information in the SERLER repository"
 * Created by James Hughes modified by Ben Dagnin
 * */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: false },
    source: { type: String, required: false },
    publisher: { type: String, required: false },
    journal: { type: String, required: false },
    volume: { type: String, required: false },
    number: { type: String, required: false },
    pagestart: { type: Number, required: false },
    pageend: { type: Number, required: false },
    doi: { type: String, required: false },
    field: { type: String, required: false }
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model("Article", ArticleSchema);
