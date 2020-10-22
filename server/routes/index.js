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

//GET route for displaying login page
router.get('/login', indexController.displayLoginPage);
//GET route for processing login page
router.post('/login', indexController.processLoginPage);
//GET route for displaying register page
router.get('/register', indexController.displayRegisterPage);
//GET route for processing register page
router.post('/register', indexController.processRegisterPage);
//GET to perform user logout
router.get('/logout', indexController.performLogout);

module.exports = router;
