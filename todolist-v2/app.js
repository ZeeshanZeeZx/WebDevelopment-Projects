//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/todolistDB");
// mongoose.connect("mongodb://127.0.0.1/todolistDB");
mongoose.connect(
  "mongodb+srv://admin-zx:Pass-123@cluster0.goisnzt.mongodb.net/todolistDB"
);

const itemsSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", itemsSchema);
const listSchema = new mongoose.Schema({ name: String, items: [itemsSchema] });
const List = mongoose.model("List", listSchema);

const item1 = new Item({
  name: "Welcome to your todolist!",
});
const item2 = new Item({
  name: "Hit + button to add new item",
});
const item3 = new Item({
  name: "<-- Hit this to mark the item done",
});

const defaultItems = [item1, item2, item3];

app.get("/", function (req, res) {
  Item.find().then((foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems)
        .then(function () {
          console.log("Successfully saved default items to DB");
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndDelete(checkedItemId)
      .then(function () {
        console.log("successfully deleted checked item.");
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } }
    )
      .exec()
      .then((foundList) => {
        if (foundList) {
          res.redirect("/" + listName);
        } else {
          console.log("List not found");
          throw new Error("List not found");
        }
      })
      .catch((err) => {
        console.error(err);
        // Handle the error or send an appropriate response
        res.status(500).send("Internal Server Error");
      });
  }
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName,
  });
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName })
      .exec()
      .then((foundList) => {
        if (foundList) {
          foundList.items.push(item);
          return foundList.save();
        } else {
          console.log("List not found");
          throw new Error("List not found");
        }
      })
      .then(() => {
        res.redirect("/" + listName);
      })
      .catch((err) => {
        console.error(err);
        // Handle the error or send an appropriate response
        res.status(500).send("Internal Server Error");
      });
  }
});

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({ name: customListName })
    .exec()
    .then((foundList) => {
      if (!foundList) {
        // console.log("Doesn't Exist");
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // console.log("Exists");
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

// 𖤍 ZX 𖤍
