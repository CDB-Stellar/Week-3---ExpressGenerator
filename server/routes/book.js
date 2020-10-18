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
            res.render('book/list', { title: 'Books', BookList: bookList });
        }
    }) 
});

/* CREATE operation */
//GET route for displaying the Add page - CREATE
router.get('/add', (req, res, next) => { //this renders the page
    res.render('book/add', { title: 'Add Book'});
})
//POST route for processing the Add page - CREATE
router.post('/add', (req, res, next) => { //same route(/add) as the display page but something different will happen
    let newBook = Book({ //Book is the book model
        "name": req.body.name, //the info is going to come from the form
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "cost":req.body.cost
    });

    Book.create(newBook, (err, Book) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/book-list');
        }
    });
})

/* UPDATE operation */
//GET route for displaying the Edit page - UPDATE
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id; //search for this id in the database and update it

    Book.findById(id, (err, bookToEdit) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/edit', {title: 'Edit Book', book: bookToEdit});
        }
    });
})
//POST route for processing the Edit page - UPDATE
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedBook = Book({
        "_id": id, //going to overwrite the id
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "cost":req.body.cost
    })

    //update the model
    Book.updateOne({_id: id}, updatedBook, (err) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/book-list');
        }
    })
})

/* DELETE operation */
//GET request to perform deletion - DELETE
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/book-list');
        }
    });
})

module.exports = router;