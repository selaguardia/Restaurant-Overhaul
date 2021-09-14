const express = require("express");
const router = express.Router();
const db = require("../models");

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

// Menu GET Route
router.get("/menu", (req, res) => {
  db.Menu.find({}, (error, allMenuItems) => {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }

    const context = {
      menuItems: allMenuItems,
    };

    res.render("menu", context);
  });
});

// New Item Form GET Route
router.get("/menu/new", (req, res) => {
  res.render("new");
});

// Create Item POST Route
router.post("/menu", (req, res, next) => {
  db.Menu.create(req.body, (error, createdMenuItem) => {
    if (error) {
      console.log(error);
      req.error = error;

      const context = {
        error,
      };
    }
    const context = {
      menuItem: createdMenuItem,
    };
    return res.render("new", context);
  });
  console.log("Successfully added to menu!")
  return res.redirect(`/menu`);
});

// router.post("/menu", (req, res, next) => {
//   db.Menu.create(req.body, (error, createdMenuItem) => {
//     if (error) {
//       console.log(error);
//       req.error = error;

//       const context = {
//         error,
//       };

//       return res.render("new", context);
//     }

//     // to avoid errors lets redirect the user to our index route and after we refactor show we can put it back how we had it.
//     return res.redirect(`/menu`);
//   });
// });

// Menu Item Show Route
router.get("/menu/:id", (req, res, next) => {
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

// Edit GET Route
router.get("/menu/:id/edit", (req, res) => {
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

// Update POST Routes
router.put("/menu/:id", (req, res) => {
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
  res.send("FIX ME");
});

// Delete Route
router.delete("/menu/:id", (req, res) => {
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
