const express = require('express');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const compression = require('compression');

const hostname = '127.0.0.1';
const port = 5500;

app.use(compression());

app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => {
  res.setHeader('Cache-Control', 'max-age=365000000, immutable');
  next();
});

// Template engine
app.set('view engine', 'ejs');
const ejs = require('ejs');
const { render } = require('express/lib/response');

app.use(express.static('static'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/product/:barcode', async (req, res) => {
  const baseUrl = 'https://world.openfoodfacts.org/api/v0/product/';
  const barcode = req.params.barcode;
  return await fetch(baseUrl + barcode)
    .then((response) => response.json())
    .then((data) => res.render('product', { data }))
    .catch((error) => error) 
})

app.post(['/', '/product/:barcode'], (req, res) => {
  res.redirect('/product/' + req.body.search)
});

app.get('/offline', (req, res) => {
  res.render('offline')
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});