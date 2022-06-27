const express = require("express");
const { Hours } = require("../models");
const router = express.Router();

// Edit StoreHours GET Route
router.get("/storeHours", async (req, res, next) => {
  try {
    // const storeHours = await Hours.find({});
    // const context = { storeHours: foundStoreHours };

    // return res.render("editHours", context);
    return res.render("editHours");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// Update StoreHours POST Route
router.put("/storeHours", async (req, res, next) => {
  try {
    const updatedStoreHours = await Menu.findByIdAndUpdate(
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
    return res.redirect(`/admin/menu`);
  } catch (error) {
    const context = { error };
    return next();
  }
});

module.exports = router;
