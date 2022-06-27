const express = require("express");
const { Menu } = require("../models");
const router = express.Router();

// Menu GET Route
router.get("/menu", async (req, res, next) => {
  try {
    const allMenuItems = await Menu.find({});
    const context = { menuItems: allMenuItems };
    return res.status(200).render("adminMenu", context);
  } catch (error) {
    res.status(404).json({ message: error.message });
    return next();
  }
});

// New Item Form GET Route
router.get("/menu/new", (req, res) => {
  try {
    const context = {
      user: req.session.currentUser.id,
    };
    res.status(200).render("new", context);  
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create Item POST Route
router.post("/menu", async (req, res, next) => {
  try {
    const createdMenuItem = await Menu.create(req.body); 
    return res.status(201).redirect(`/admin/menu/${createdMenuItem.id}`);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// MenuItem GET Show Route
router.get("/menu/:id", async (req, res, next) => {
  try {
    const foundMenuItem = await Menu.findById(req.params.id);
    const context = { menuItem: foundMenuItem };
    return res.status(200).render("menuItemShow", context);
  } catch (error) {
    res.status(404).json({ message: error.message });
    return next();
  }
});

// Edit GET Route
router.get("/menu/:id/edit", async (req, res, next) => {
  try {
    const foundMenuItem = await Menu.findById(req.params.id);
    const context = { menuItem: foundMenuItem };
    return res.status(200).render("edit", context);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
    return res.status(201).redirect(`/admin/menu/${updatedMenuItem.id}`);
  } catch (error) {
    res.status(404).json({ message: error.message });
    return next();
  }
});

// Delete Route
router.delete("/menu/:id", async (req, res, next) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    return res.status(200).redirect("/admin/menu");
  } catch (error) {
    res.status(404).json({ message: error.message });
    return next();
  }
});

module.exports = router;
