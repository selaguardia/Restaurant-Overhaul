const express = require("express");
const app = express();

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Server Works!");
});

app.listen(PORT, (req, res) => {
  console.log(`✅ Live on Port ${PORT} ✅`);
});
