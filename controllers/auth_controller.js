const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// Register GET
router.get("/register", (req, res) => {
  return res.status(200).render("auth/register");
});

// Register POST
router.post("/register", async (req, res) => {
  try {
    if (req.body.password !== req.body.passwordTwo) {
      return res.send("Sorry, your passwords don't match!");
    }
    const foundUser = await User.exists({
      $or: [{ email: req.body.email },],
    });
    if (foundUser) {
      return res.redirect("/login");
    }
    const salt = await bcrypt.genSalt(10); // create a salt
    const hash = await bcrypt.hash(req.body.password, salt); // hash password
    req.body.password = hash;
    const createdUser = await User.create(req.body);
    return res.status(200).redirect("/login");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Login GET
router.get("/login", (req, res) => {
  return res.status(200).render("auth/login");
});

// Login POST
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    
    if (!foundUser) {
      return res.redirect("/register");
    }
    const match = await bcrypt.compare(req.body.password, foundUser.password)
    if (!match) {
      return res.send("Sorry, password is invalid");
    }
    // if passwords DO match add the user info to the session Credentials
    req.session.currentUser = {
      id: foundUser._id,
    };
    return res.status(200).redirect("/admin/menu");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Logout GET
router.get("/logout", async (req, res) => {
  try {
    await req.session.destroy();
    return res.status(200).redirect("/");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
