const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4000;

const menuCtrls = require("./controllers/menu_controllers.js");

require('./config/db.connections.js')

// Middleware
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/", menuCtrls);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Route call for middle ware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// 404 page
app.use("/*", (req, res) => {
  const context = { error: req.error };
  return res.status(404).render("404", context);
});

app.listen(PORT, (req, res) => {
  console.log(`✅ Listening for client requests on Port ${PORT} ✅`);
});
