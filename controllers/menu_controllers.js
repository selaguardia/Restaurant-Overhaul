const express = require("express");
const { Menu } = require("../models");
const router = express.Router();
const db = require("../models");

// Menu GET Route === Refactored to Aysnc/Await & try/catch statement
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

// Create Item POST Route === Refactored to Aysnc/Await & try/catch statement
router.post("/menu", async (req, res, next) => {
  try {
    const createdMenuItem = await Menu.create(req.body); // if not used to redirect below then you can ommit assigning it to the const.
    return res.redirect(`/admin/menu/${createdMenuItem.id}`); // can redirect to menu/${createdMenuItem.id}
  } catch (error) {
    console.log(error)
    const context = { error };
    return res.render("new", context);
  }
});

// MenuItem GET Show Route === Refactored to Aysnc/Await & try/catch statement
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

// Edit GET Route === Refactored to Aysnc/Await & try/catch statement
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

// Update POST Route === Refactored to Aysnc/Await & try/catch statement
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
    return res.redirect(`/menu/${updatedMenuItem.id}`);
  } catch (error) {
    const context = { error };
    return next();
  }
});

// Delete Route === Refactored to Aysnc/Await & try/catch statement
router.delete("/menu/:id", async (req, res, next) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    return res.redirect("/menu");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

module.exports = router;

// // Menu GET Route
// router.get("/", (req, res) => {
//   db.Menu.find({}, (error, allMenuItems) => {
//     if (error) {
//       console.log(error);
//       req.error = error;
//       return next();
//     }

//     const context = {
//       menuItems: allMenuItems,
//     };

//     res.render("menu", context);
//   });
// });

// // Create Item POST Route
// router.post("/", (req, res, next) => {
//   db.Menu.create(req.body, (error, createdMenuItem) => {
//     console.log("*** req.body ====>", req.body);
//     if (error) {
//       req.error = error;
//       const context = { error };
//       console.log(error);
//       return res.render("new", context);
//     }
//     const context = {
//       menuItem: createdMenuItem,
//     };
//     console.log(createdMenuItem);
//     return res.redirect(`/menu`);
//   });
// });


// // MenuItem GET Show Route
// router.get("/:id", (req, res, next) => {
//   db.Menu.findById(req.params.id, (error, foundMenuItem) => {
  //     if (error) {
    //       console.log(error);
//       req.error = error;
//       return next();
//     }
//     const context = {
  //       menuItem: foundMenuItem,
//     };
//     return res.render("show", context);
//   });
// });

// // Edit GET Route
// router.get("/:id/edit", (req, res) => {
  //   db.Menu.findById(req.params.id, (error, foundMenuItem) => {
//     if (error) {
  //       console.log(error);
  //       req.error = error;
  //       return next();
  //     }
  //     const context = {
    //       menuItem: foundMenuItem,
    //     };
    //     return res.render("edit", context);
    //   });
    // });

// // Update POST Routes
// router.put("/:id", (req, res) => {
//   db.Menu.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: {
//         ...req.body,
//       },
//     },
//     {
//       new: true,
//     },
//     (error, updatedMenuItem) => {
//       if (error) {
//         console.log(error);
//         req.error = error;
//         return next();
//       }
//       return res.redirect(`/menu/${updatedMenuItem.id}`);
//     }
//   );
// });    
    
// // Delete Route
// router.delete("/:id", (req, res) => {
//   db.Menu.findByIdAndDelete(req.params.id, (error, deletedMenuItem) => {
//     if (error) {
//       console.log(error);
//       req.error = error;
//       return next();
//     }
//     return res.redirect("/menu");
//   });
// });