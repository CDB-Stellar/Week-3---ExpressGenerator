let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connect to the book model schema
let Book = require('../models/book'); //Book is capital as if it is a class

//GET route for the Book list page - READ operation
//to book list edit/add/delete it's like creating sub pages 
router.get('/', (req, res, next) => {
    Book.find((err, bookList) => { //Book model find
        if (err) 
        {
            return console.error(err);
        }
        else 
        {
            //print out the Book list in the book.ejs table
            res.render('book', { title: 'Book List', BookList: bookList });
        }
    }) 
});

module.exports = router;