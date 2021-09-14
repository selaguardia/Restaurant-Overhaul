const express = require("express");
const router = express.Router();
// const db = require("../models");

// Home Route
router.get("/home", (req, res, next) => {
  res.render("home");
});

// About Us Route
router.get("/about", (req, res, next) => {
  res.render("about");
});

// Banquets Route
router.get("/banquets", (req, res, next) => {
  res.render("banquets");
});

// Contact Route
router.get("/contact", (req, res, next) => {
  res.render("contact");
});

module.exports = router;