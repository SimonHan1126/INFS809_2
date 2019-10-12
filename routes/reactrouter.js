const express = require("express");
const router = require("express").Router();
const path = require("path");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  router.use(express.static(path.join(__dirname, "../client/build")));
  router.get("/", (req, res) => {
    res.sendfile(path.join((__dirname, "../client/build/index.html")));
  });
}

router.use(express.static(path.join(__dirname, "../client/build")));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;
