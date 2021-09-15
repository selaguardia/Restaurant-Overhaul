const express = require("express");
const methodOverride = require("method-override");
const app = express();
const controllers = require("./controllers");

require("dotenv").config();

app.use((req, res, next) => {
  console.log(`METHOD:${req.method} \nOG-URL:${req.originalUrl}`);
  next();
});

require('./config/db.connections.js')

// Middleware
app.use(express.urlencoded({ extended: false }));   // Body parser
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// For update / delete
app.use(methodOverride('_method'));

// For routes
app.use("/menu", controllers.menu);
app.use("/", controllers.other);

// 404 page
app.use("/*", (req, res) => {
  const context = { error: req.error };
  return res.status(404).render("404", context);
});

// app.listen(PORT, (req, res) => {
//   console.log(`✅ Listening for client requests on Port ${PORT} ✅`);
// });

app.listen(process.env.PORT || 3000);
