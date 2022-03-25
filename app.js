const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

const hostname = '127.0.0.1';
const port = 5500;

// Template engine
app.set('view engine', 'ejs');
let ejs = require('ejs');
const { render } = require('express/lib/response');

app.use(express.static('static'))

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/product/:barcode', async function(req, res) {
  const baseUrl = 'https://world.openfoodfacts.org/api/v0/product/';
  const barcode = req.params.barcode;
 
  return await fetch(baseUrl + barcode)
    .then((response) => response.json())
    .then((data) => res.render('product', { data }))
    .catch((error) => error) 
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});