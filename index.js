const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todoList");
const trySchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model("task", trySchema);
const todoList = new Item({ name: "Welcome to your todo list!" });
const todoList2 = new Item({ name: "Hit the + button to add a new item." });
const todoList3 = new Item({ name: "<-- Hit this to delete an item." });
const todoList4 = new Item({ name: "Enjoy your day!" });
app.get("/", async function (req, res) {
  try {
    const foundItems = await Item.find({});
    if (foundItems.length === 0) {
      await Item.insertMany([todoList, todoList2, todoList3, todoList4]);
      console.log("Successfully saved all the items to the database.");
      res.redirect("/");
    } else {
      res.render("list", { ejes: foundItems });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred.");
  }
});
app.post("/", async function(req, res) {
  const ItemName = req.body.ele1;
  const todoList4 = new Item({
    name: ItemName
  });
  try {
    await todoList4.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while saving the item.");
  }
});
app.post("/delete", async function(req, res) {
  const checked = req.body.checkbox1;
  try {
    await Item.findByIdAndDelete(checked);
    console.log("deleted");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while deleting the item.");
  }
});
app.listen("3000", function () {
  console.log("Server is running on port 3000");
});