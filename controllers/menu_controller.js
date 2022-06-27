const express = require("express");
const { Menu } = require("../models");
const router = express.Router();

// Menu GET Route
router.get("/menu", async (req, res, next) => {
  try {
    const allMenuItems = await Menu.find({});
    const context = { menuItems: allMenuItems };
    return res.render("adminMenu", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// New Item Form GET Route
router.get("/menu/new", (req, res) => {
  const context = {
    user: req.session.currentUser.id,
  };
  res.render("new", context);
});

// Create Item POST Route
router.post("/menu", async (req, res, next) => {
  try {
    const createdMenuItem = await Menu.create(req.body); 
    return res.redirect(`/admin/menu/${createdMenuItem.id}`);
  } catch (error) {
    console.log(error)
    const context = { error };
    return res.render("new", context);
  }
});

// MenuItem GET Show Route
router.get("/menu/:id", async (req, res, next) => {
  try {
    const foundMenuItem = await Menu.findById(req.params.id);
    const context = { menuItem: foundMenuItem };
    return res.render("menuItemShow", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// Edit GET Route
router.get("/menu/:id/edit", async (req, res, next) => {
  try {
    const foundMenuItem = await Menu.findById(req.params.id);
    const context = { menuItem: foundMenuItem };
    return res.render("edit", context);
  } catch (error) {
    const context = { error };
    return res.render("edit", context);
  }
});

// Update POST Route
router.put("/menu/:id", async (req, res, next) => {
  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      },
    );
    return res.redirect(`/admin/menu/${updatedMenuItem.id}`);
  } catch (error) {
    const context = { error };
    return next();
  }
});

// Delete Route
router.delete("/menu/:id", async (req, res, next) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    return res.redirect("/admin/menu");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

module.exports = router;
