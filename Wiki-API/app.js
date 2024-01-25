const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1/wikiDB");

const articlesSchema = mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articlesSchema);

// Rest targeting all the articles
app
  .route("/articles")
  .get((req, res) => {
    Article.find({})
      .exec()
      .then((found) => {
        res.send(found);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .post((req, res) => {
    const getTitle = req.body.title;
    const getContent = req.body.content;
    const dataObj = new Article({
      title: getTitle,
      content: getContent,
    });
    dataObj.save((err) => {
      if (!err) {
        res.send("Successfully added a new article.");
      } else {
        console.log(err);
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany({})
      .exec()
      .then(() => {
        res.send("Successfully deleted all articles");
      })
      .catch((err) => {
        console.log(err);
      });
  });

// Rest targeting Specific the articles
app
  .route("/articles/:articleID")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleID })
      .exec()
      .then((foundItem) => {
        if (foundItem) {
          res.send(foundItem);
        } else {
          res.send("No Articles matching that title was found!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .put((req, res) => {
    Article.updateOne(
      { title: req.params.articleID },
      { title: req.body.title, content: req.body.content }
    )
      .then(() => {
        res.send("Successfully Updated!!");
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .patch((req, res) => {
    Article.updateOne({ title: req.params.articleID }, { $set: req.body })
      .then(() => {
        res.send("Successfully Updated!!");
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleID })
      .exec()
      .then(() => {
        res.send("Succeefully deleted particular article");
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.listen(3000, function () {
  console.log("Server is Running on port 3000");
});

//𖤍 ZX 𖤍
