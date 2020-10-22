let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET all pages. */
//'/' is the homepage
router.get('/', indexController.displayHomePage);
//Home page again incase someone types in /home
router.get('/home', indexController.displayHomePage);
//About page
router.get('/about', indexController.displayAboutPage);
//Products page
router.get('/products', indexController.displayProductsPage);
//Services page
router.get('/services', indexController.displayServicesPage);
//Contact Us page
router.get('/contact', indexController.displayContactPage);

module.exports = router;
