const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
const dbUrl =
  "mongodb+srv://ancrobot2244:deI3RAmjxFgKOgDe@cluster0.bhgwkdm.mongodb.net/test";

const Item = require("./models/item");

app.use(cors());
app.use(express.json());

mongoose.connect(dbUrl);

app.post("/items", (req, res) => {
  const { name } = req.body;
  Item.create({
    name: name,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/items", (req, res) => {
  Item.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  Item.findById(id)
    .then((item) => {
      item.completed = !item.completed;
      return item.save();
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
});

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  Item.findByIdAndDelete(id)
    .then((result) => {
      res.json({ message: "Item deleted successfully" });
    })
    .catch((err) => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
