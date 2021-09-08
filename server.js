const express = require("express");
const app = express();


const PORT = 4000;


// Middleware
app.use((req, res, next) => {    
	console.log(`${req.method} ${req.originalUrl}`);    
	next();
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Index Route
app.get("/", (req, res) => {
  res.render("index");
});

// Create Route
app.get("/new", (req, res) => {
  res.render("create");
});

// Post Route
app.post("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

// Edit Routes
app.get("/:id/edit", (req, res) => {
  res.render("edit");
});

// Update Routes
app.put("/:id", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

// Delete Route
app.delete("/:id", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

// 404 page
app.use("/*", (req, res) => {
  const context = { error: req.error };
  return res.status(404).render("404", context);
})

app.listen(PORT, (req, res) => {
  console.log(`✅ Live on Port ${PORT} ✅`);
});
