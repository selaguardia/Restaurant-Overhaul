const express = require('express');
const router = express.Router();

// Index Route
router.get("/", (req, res) => {
  res.render("index");
});

// Create Form Route
router.get("/new", (req, res) => {
  res.render("create");
});

// Post Route
router.post("/", (req, res) => {
  if (error) return console.log(error);
  res.send("<h1>Home Page</h1>");
});

// Edit Routes
router.get("/:id/edit", (req, res) => {
  res.render("edit");
});

// Update Routes
router.put("/:id", (req, res) => {
  if (error) return console.log(error);
  res.send("<h1>Home Page</h1>");
});

// Delete Route
router.delete("/:id", (req, res) => {
  if (error) return console.log(error);
  res.send("<h1>Home Page</h1>");
});

module.exports = router;