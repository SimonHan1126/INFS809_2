/*jshint esversion: 6*/

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//REMEMBER TO WHITELIST THE IP OF THE CONNECTING SERVER IN MONGODB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const excercisesRouter = require("./routes/excercises");
const usersRouter = require("./routes/users");

app.use("/excercises", excercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

module.exports = app;
