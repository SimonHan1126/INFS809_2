/**
 * Model class for Article (eg: journal article, book, ect) in the database as per "SDM INFS809 Assignment 2 Supporting Documentation Information in the SERLER repository"
 * Created by James Hughes modified by Ben Dagnin
 * */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    source: { type: String, required: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    publisher: { type: String, required: false },
    journal: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    volume: { type: String, required: true },
    number: { type: String, required: true },
    pagestart: { type: Number, required: true },
    pageend: { type: Number, required: true },
    doi: { type: String, required: true },
    field: { type: String, required: true }
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model("Article", ArticleSchema);