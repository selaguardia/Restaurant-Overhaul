const express = require("express");
const methodOverride = require("method-override");
const controllers = require("./controllers");
// Creates and handles cookies
const session = require("express-session");
// Stores active cookies in MongoDB for persistent sessions over server restart.
const MongoStore = require("connect-mongo");

require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  console.log(`METHOD:${req.method} \nOG-URL:${req.originalUrl}`);
  next();
});

require('./config/db.connections.js')

// Middleware
app.use(express.urlencoded({ extended: false }));   // Body parser
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Session Controller
app.use(
  session({
    // this will store the cookies in the mongodb database
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    // secret key will sign the cookie for validation
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie config
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
    },
  })
);
// For update / delete
app.use(methodOverride('_method'));

// For routes
app.use("/", controllers.auth);
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
