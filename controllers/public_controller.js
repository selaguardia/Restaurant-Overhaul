const express = require("express");
const { Menu } = require("../models");
const router = express.Router();

// Home Route
router.get("/", (req, res, next) => {
  res.status(200).render("publicAccess/home");
});

// About Us Route
router.get("/about", (req, res, next) => {
  res.status(200).render("publicAccess/about");
});

// Menu GET Route
router.get("/menu", async (req, res, next) => {
  try {
    const allMenuItems = await Menu.find({});
    const context = { menuItems: allMenuItems };
    return res.status(200).render("publicAccess/publicMenu", context);
  } catch (error) {
    res.status(404).json({ message: error.message });
    return next();
  }
});

// MenuItem GET Show Route
router.get("/menu/:id", async (req, res, next) => {
  try {
    const foundMenuItem = await Menu.findById(req.params.id);
    const context = { menuItem: foundMenuItem };
    return res.status(200).render("publicAccess/show", context);
  } catch (error) {
    res.status(404).json({ message: error.message });
    return next();
  }
});

// Banquets Route
router.get("/banquets", (req, res, next) => {
  res.status(200).render("publicAccess/banquets");
});

// Contact Route
router.get("/contact", (req, res, next) => {
  res.status(200).render("publicAccess/contact");
});

module.exports = router;