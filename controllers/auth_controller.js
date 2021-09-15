const express = require("express");
const router = express.Router();
// Will be used to securely handle user passwords
const bcrypt = require("bcryptjs");
const { User } = require("../models");

module.exports = router;