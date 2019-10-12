/*jshint esversion: 6*/

//Imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();


//App Setup
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


//MongoDB Setup
const uri = process.env.ATLAS_URI || "mongodb+srv://127.0.0.1";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB");
});


//Routes
const articleRouter = require("./routes/articles");
app.use("/articles", articleRouter);

//Route react through express
const reactRouter = require("./routes/reactrouter");
app.use("/", reactRouter);


//Server Initialization
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

module.exports = app;
