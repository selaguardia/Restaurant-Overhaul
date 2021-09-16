const express = require("express");
const router = express.Router();
// Will be used to securely handle user passwords
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// Register GET
router.get("/register", (req, res) => {
  return res.render("auth/register");
});

// Login GET
router.get("/login", (req, res) => {
  return res.render("auth/login");
});

// Register POST
router.post("/register", async (req, res) => {
  try {
    // if password !== passwordTwo
    // res.send(passwords do not match )
    if (req.body.password !== req.body.passwordTwo) {
      return res.send("Sorry, your passwords don't match!");
    }
    // check if user exists
    const foundUser = await User.exists({
      $or: [{ email: req.body.email },],
    });
    // if user does exist, redirect to login
    if (foundUser) {
      console.log('foundUser', foundUser);
      return res.redirect("/login");
    }

    // if user does not exist

    // create a salt
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hash = await bcrypt.hash(req.body.password, salt);

    req.body.password = hash;

    // create user
    const createdUser = await User.create(req.body);

    // redirect to login
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// Login POST
router.post("/login", async (req, res) => {
  try {
    console.log('foundUser==>', req);
    // check if user exists
    const foundUser = await User.findOne({ email: req.body.email });
    // if user does not exist
    // redirect to register
    if (!foundUser) {
      return res.redirect("/register");
    }
    // if user does exist
    // compare passwords
    // NOTE Authentication
    const match = await bcrypt.compare(req.body.password, foundUser.password);
    // if passwords do not match
    // send password invalid
    if (!match) {
      return res.send("Sorry, password is invalid");
    }
    // if passwords do match
    // add the user info to the session
    // NOTE Credentials
    req.session.currentUser = {
      id: foundUser._id,
    };
    // redirect to menu
    return res.redirect("/menu");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// Logout GET
router.get("/logout", async (req, res) => {
  try {
    await req.session.destroy();
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

module.exports = router;
