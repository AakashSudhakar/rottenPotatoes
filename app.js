// app.js

var express = require("express");
var app = express();
var exphbs = require("express-handlebars");
/* var reviews = [
  {title: "Great Review"},
  {title: "Good Review"},
  {title: "Terrible Review"}
]; */
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/rotten-potatoes");
var Review = mongoose.model("Review", {
  title: String
});
var bodyParser = require("body-parser");

// Initialize our body parser
app.use(bodyParser.urlencoded({ extended: true }));


// App initializing handlebars (1/2)
app.engine("handlebars", exphbs({defaultLayout: "main"})); // New Review is defined in the layout template so it shows up errywhere


// App sends message to local port
/* app.get("/", function(req, res) {
  res.render("home", {msg: "Hello World!"});
  // res.send("Hello World!");
}); */

// Index to see all reviews
app.get("/", function(req, res) {
  Review.find(function(err, reviews) {
    res.render("reviews-index", {reviews: reviews});
  });
});

app.get("/reviews/new", function(req, res) {
  res.render("reviews-new", {});
});


app.post("/reviews", function(req, res) {
  console.log(req.body);
  // res.render("reviews-new", {});
});


// App initializing handlebars (2/2)
app.set("view engine", "handlebars")


// App listens on local port 3000
app.listen(3000, function() {;
  console.log("Portfolio log listening on port 3000!");
});
