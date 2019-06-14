const express = require("express");
const axios = require("axios");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
//app.use(routes);
var db = require("./models");
// using scrape examples to get books using axios starts here

app.get("/search/:query", function(req, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios.get("https://www.googleapis.com/books/v1/volumes?q=" + req.params.query).then(function(response) {

  // load response data in books var 
  var books = response.data.items 
  var data = [];
  //console.log(books);
for (var i = 0; i<books.length; i++){
  var bookData = {
    title:books[i].volumeInfo.title,
    authors: books[i].volumeInfo.authors,
    description: books[i].volumeInfo.description,
    image: books[i].volumeInfo.imageLinks.thumbnail,
    link: books[i].volumeInfo.previewLink
  };
  data.push(bookData)
          // Insert the data in the scrapedData db
          db.Book.create({
            title:bookData.title,
    authors: bookData.authors,
    description:bookData.description,
    image: bookData.image,
    link: bookData.link,
          },
            function(err, inserted) {
              if (err) {
                // Log the error if one is encountered during the query
                console.log(err);
              }
              else {
                // Otherwise, log the inserted data
                console.log(inserted);
              }
      });

}
res.json(data);
console.log(data);
  });
});


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
