let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let bookController = require('../controllers/book');

//Helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if (!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//Connect to the book model schema
//let Book = require('../models/book'); //Book is capital as if it is a class

//GET route for the Book list page - READ operation
//to book list edit/add/delete it's like creating sub pages 
router.get('/', bookController.displayBookList);

/* CREATE operation */
//GET route for displaying the Add page - CREATE
router.get('/add', requireAuth, bookController.displayAddPage);

//POST route for processing the Add page - CREATE
router.post('/add', requireAuth, bookController.processAddPage);

/* UPDATE operation */
//GET route for displaying the Edit page - UPDATE
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

//POST route for processing the Edit page - UPDATE
router.post('/edit/:id', requireAuth, bookController.processEditPage);

/* DELETE operation */
//GET request to perform deletion - DELETE
router.get('/delete/:id', requireAuth, bookController.performDelete);

module.exports = router;