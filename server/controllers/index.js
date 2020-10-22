//Index controller
let express = require('express');
let router = express.Router();

//displayHomePage is a method
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'}); //render the index.ejs page
    //pass it 'title' property that has the value 'Express'
    //could pass multiple properties (Ex. title: 'Express', h1: 'Main Heading')
    //whatever you pass will be "injected" into the index.ejs file, you should have it there between <%= %>
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {title: 'About'}); 
}
module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', { title: 'Products' }); 
}
module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services' }); 
}
module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact Us' }); 
}
