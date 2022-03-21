const https = require('https');
const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 5500;

// Get data from api
https.get('https://world.openfoodfacts.org/api/v0/product/8713500010456', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

// Template engine
app.set('view engine', 'ejs');
let ejs = require('ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});