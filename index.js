const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());

mongoose.connect("mongodb://localhost:27017/yuka-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const userRoutes = require("./routes/user");
app.use(userRoutes);
const userProducts = require("./routes/product");
app.use(userProducts);

app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Cette route n'existe pas." });
});

app.listen(3000, () => {
  console.log("Server has started");
});
