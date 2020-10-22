let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connect to the book model schema
let Book = require('../models/book'); //Book is capital as if it is a class

let bookController = require('../controllers/book');

//GET route for the Book list page - READ operation
//to book list edit/add/delete it's like creating sub pages 
router.get('/', bookController.displayBookList);

/* CREATE operation */
//GET route for displaying the Add page - CREATE
router.get('/add', bookController.displayAddPage);

//POST route for processing the Add page - CREATE
router.post('/add', bookController.processAddPage);

/* UPDATE operation */
//GET route for displaying the Edit page - UPDATE
router.get('/edit/:id', bookController.displayEditPage);

//POST route for processing the Edit page - UPDATE
router.post('/edit/:id', bookController.processEditPage);

/* DELETE operation */
//GET request to perform deletion - DELETE
router.get('/delete/:id', bookController.performDelete);

module.exports = router;