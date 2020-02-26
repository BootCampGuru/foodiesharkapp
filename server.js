
// =============================================================
var express = require("express");
const yelp = require('yelp-fusion');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static("app/public"));
const apiKey = '';

const client = yelp.client(apiKey);

// Routes
// =============================================================
require("./app/routes/api-routes.js")(app, client);

// Here we introduce HTML routing to serve different HTML files
require("./app/routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
