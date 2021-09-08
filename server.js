const express = require("express");
const app = express();

const PORT = 4000;

app.set("view engine", "ejs");
app.use(express.static("public"));

// Index Route
app.get("/", (req, res) => {
  res.render("index");
});

// Create Route
app.get("/new", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

// Post Route
app.post("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

// // Show Route
// app.get("/:id", (req, res) => {
//   res.send("<h1>Home Page</h1>");
// });

// Edit Routes
app.get("/:id/edit", (req, res) => {
  res.send("<h1>Home Page</h1>");
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
