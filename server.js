/*jshint esversion: 6*/

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//REMEMBER TO WHITELIST THE IP OF THE CONNECTING SERVER IN MONGODB
const uri = process.env.ATLAS_URI || "mongodb+srv://127.0.0.1";
//const uri = "mongodb+srv://trooblet:h8VKMShGXf8TlmUL@cluster0-dhsg3.gcp.mongodb.net/admin?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const articleRouter = require("./routes/articles");
app.use("/articles", articleRouter);

// const tempArticlesRouter = require("./routes/submission");
// app.use("/submission", tempArticlesRouter);

//This is code for serving react through express

//app.use(express.static(path.join(__dirname, "client/build")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));
//   app.get("*", (req, res) => {
//     res.sendfile(path.join((__dirname, "client/build/index.html")));
//   });
// }

//app.use(express.static(path.join(__dirname, "client/public")));

// app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "/client/public/index.html"));
// });

const reactRouter = require("./routes/reactrouter");
app.use("/", reactRouter);

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

module.exports = app;
