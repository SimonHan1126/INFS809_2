/*jshint esversion: 6*/

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//REMEMBER TO WHITELIST THE IP OF THE CONNECTING SERVER IN MONGODB
const uri = process.env.ATLAS_URI || "mongodb+srv://127.0.0.1";
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

app.use(express.static(path.join(__dirname, 'client/build')));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
app.get('/', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

module.exports = app;
