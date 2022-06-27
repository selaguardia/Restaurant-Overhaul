const express = require("express");
const app = express();
const methodOverride = require("method-override");
const controllers = require("./controllers");
const session = require("express-session");// Creates and handles cookies
const MongoStore = require("connect-mongo");// Stores active cookies in MongoDB for persistent sessions over server restart
const port = process.env.PORT || 5000; 

require("dotenv").config();
require("./config/db.connections.js");

app.use((req, res, next) => {
  console.log(`METHOD:${req.method} \nOG-URL:${req.originalUrl}`);
  next();
});

// Middleware
app.use(express.urlencoded({ extended: false })); // Body parser
app.set("view engine", "ejs");
app.use(express.static("public"));

// Session Controller
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
    },
  })
);

// For update / delete
app.use(methodOverride("_method"));

// Check to see the current user is still valid
const authRequired = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
};

// For routes
app.use("/", controllers.public);
app.use("/", controllers.auth);
app.use("/admin", authRequired, controllers.menu);
app.use("/admin", authRequired, controllers.hours);

// 404 page
app.use("/*", (req, res) => {
  const context = { error: req.error };
  return res.status(404).render("404", context);
});

app.listen(port, () => {
  console.log(`✅ Listening for client requests on Port ${port} ✅`);
});
