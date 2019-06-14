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

// using scrape examples to get books using axios starts here

app.get("/search/:query", function(req, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios.get("https://www.googleapis.com/books/v1/volumes?q=" + req.params.query).then(function(response) {

  // load response data in books var 
  var book = response.data.items
  res.json(book); 
  console.log(book);

    // Load the html body from axios into cheerio
    // var $ = cheerio.load(response.data);
    // For each element with a "title" class
    // $(".title").each(function(i, element) {
    //   // Save the text and href of each link enclosed in the current element
    //   var title = $(element).children("a").text();
    //   var link = $(element).children("a").attr("href");

    //   // If this found element had both a title and a link
    //   if (title && link) {
    //     // Insert the data in the scrapedData db
    //     db.scrapedData.insert({
    //       title: title,
    //       link: link
    //     },
    //     function(err, inserted) {
    //       if (err) {
    //         // Log the error if one is encountered during the query
    //         console.log(err);
    //       }
    //       else {
    //         // Otherwise, log the inserted data
    //         console.log(inserted);
    //       }
    //     });
    //   }
    // });
  });

  // Send a "Scrape Complete" message to the browser
  // res.send("Scrape Complete");
  
});


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
