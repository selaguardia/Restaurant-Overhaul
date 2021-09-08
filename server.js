const express = require("express");
const app = express();
const menuCtrls = require('./controllers/menu_controllers.js');

const PORT = 4000;


// Middleware
app.use((req, res, next) => {    
	console.log(`${req.method} ${req.originalUrl}`);    
	next();
});
app.use('/', menuCtrls);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));



// 404 page
app.use("/*", (req, res) => {
  const context = { error: req.error };
  return res.status(404).render("404", context);
})

app.listen(PORT, (req, res) => {
  console.log(`✅ Live on Port ${PORT} ✅`);
});
