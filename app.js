// app.js

var express = require("express");
var methodOverride = require("method-override");
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
  title: String,
  description: String,
  movieTitle: String
});
var bodyParser = require("body-parser");

// Initialize our body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Method Override that intercepts PUT request for launching POST/DELETE requests
app.use(methodOverride("_method"));

// App initializing handlebars (1/2)
app.engine("handlebars", exphbs({defaultLayout: "main"})); // New Review is defined in the layout template so it shows up errywhere


// App sends message to local port
/* app.get("/", function(req, res) {
  res.render("home", {msg: "Hello World!"});
  // res.send("Hello World!");
}); */

// INDEX
app.get("/", function(req, res) {
  Review.find(function(err, reviews) {
    res.render("reviews-index", {reviews: reviews});
  });
});

app.get("/reviews/new", function(req, res) {
  res.render("reviews-new", {});
});

app.get("/reviews/:id", function(req, res) {
  Review.findById(req.params.id).exec(function(err, review) {
    res.render("reviews-show", {review: review});
  });
});

// EDIT
app.get("/reviews/:id/edit", function(req, res) {
  Review.findById(reqs.params.id, function(err, review) {
    res.render("reviews-edit", {review: review});
  });
});

// CREATE
app.post("/reviews", function(req, res) {
  Review.create(req.body, function(err, review) {
    console.log(review);

    res.redirect("/reviews/" + review._id);
  });
});

// UPDATE (Intercepted PUT request)
app.put("/reviews/:id", function(req, res) {
  Review.findByIdAndUpdate(req.params.id, req.body, function(err, review) {
    res.redirect("/reviews/" + review._id);
  });
});

// App initializing handlebars (2/2)
app.set("view engine", "handlebars")


// App listens on local port 3000
app.listen(3000, function() {;
  console.log("Portfolio log listening on port 3000!");
});
