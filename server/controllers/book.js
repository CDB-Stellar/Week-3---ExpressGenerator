//All the logic for the routes/book.js file
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the db schema (model)
let Book = require('../models/book'); //book model

module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => { //Book model find
        if (err) 
        {
            return console.error(err);
        }
        else 
        {
            //print out the Book list in the book.ejs table
            res.render('book/list', { 
                title: 'Books', 
                BookList: bookList, 
                displayName: req.user ? req.user.displayName : '' });
        }
    }) 
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', { title: 'Add Book', 
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req, res, next) => { //same route(/add) as the display page but something different will happen
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
}

module.exports.displayEditPage = (req, res, next) => {
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
            res.render('book/edit', {title: 'Edit Book', book: bookToEdit, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
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
}

module.exports.performDelete = (req, res, next) => {
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
}