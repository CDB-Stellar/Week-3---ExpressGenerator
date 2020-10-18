var express = require('express');
var router = express.Router();

/* GET home page. */
//'/' is the homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' }); //render the index.ejs page
  //pass it 'title' property that has the value 'Express'
  //could pass multiple properties (Ex. title: 'Express', h1: 'Main Heading')
  //whatever you pass will be "injected" into the index.ejs file, you should have it there between <%= %>
});

//Home page again incase someone types in /home
router.get('/home', function(req, res, next) { //make all routes lowercase
  res.render('index', { title: 'Home' }); 
});

//About page
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About' }); 
});

//Products page
router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products' }); 
});

//Services page
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' }); 
});

//Contact Us page
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us' }); 
});

module.exports = router;
