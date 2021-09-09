const express = require("express");
const router = express.Router();
const db = require("../models");

// Index Route
router.get("/", (req, res) => {
  db.Menu.find({}, (error, allMenuItems) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }

    const context = {
      menuItems: allMenuItems,
    };

    res.render("index", context);
  });
});

// New Item Form Route
router.get("/new", (req, res, next) => {
  res.render("create");
});

// Show Routes
router.get("/:id", (req, res, next) => {
  db.Menu.findById(req.params.id, (error, foundMenuItem) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }
    const context = {
      menuItem: foundMenuItem,
    };
    return res.render("show", context);
  });
});

// Post Route
router.post("/", (req, res) => {
  db.Menu.create(req.body, (error, createdMenuItem) => {
    if (error) {
      console.log(error);
      req.error = error;

      const context = { error };

      return res.render("create", context);
    }
    return res.redirect(`/menu`);
  });
});

// Edit Routes
router.get("/:id/edit", (req, res) => {
  db.Menu.findById(req.params.id, (error, foundMenuItem) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }
    const context = {
      menuItem: foundMenuItem,
    };
    return res.render("edit", context);
  });
});

// Update Routes
router.put("/:id", (req, res) => {
  db.Menu.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...req.body,
      },
    },
    {
      new: true,
    },
    (error, updatedMenuItem) => {
      if (error) {
        console.log(error);
        req.error = error;
        return next();
      }
      return res.redirect(`/menu/${updatedMenuItem.id}`);
    }
  );
  if (error) return console.log(error);
  res.send("<h1>Home Page</h1>");
});

// Delete Route
router.delete("/:id", (req, res) => {
  db.Menu.findByIdAndDelete(req.params.id, (error, deletedMenuItem) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }
    return res.redirect("/menu");
  });
});

module.exports = router;
