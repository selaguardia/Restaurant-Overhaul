const express = require("express");
const { Menu } = require("../models");
const router = express.Router();

// Home Route
router.get("/", (req, res, next) => {
  res.render("publicAccess/home");
});

// About Us Route
router.get("/about", (req, res, next) => {
  res.render("publicAccess/about");
});

// Menu GET Route
router.get("/menu", async (req, res, next) => {
  try {
    const allMenuItems = await Menu.find({});
    const context = { menuItems: allMenuItems };
    return res.render("publicAccess/publicMenu", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// MenuItem GET Show Route
router.get("/menu/:id", async (req, res, next) => {
  try {
    const foundMenuItem = await Menu.findById(req.params.id);
    const context = { menuItem: foundMenuItem };
    return res.render("publicAccess/show", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// Banquets Route
router.get("/banquets", (req, res, next) => {
  res.render("publicAccess/banquets");
});

// Contact Route
router.get("/contact", (req, res, next) => {
  res.render("publicAccess/contact");
});

module.exports = router;