let mongoose = require('mongoose')

//Create a Mongoose model class
let bookModel = mongoose.Schema({
    name: String,
    author: String,
    published: String,
    description: String,
    cost: Number
},
{
    collection: "books" //in MongoDB it is db.books.blah
});

module.exports = mongoose.model('Book', bookModel); //turn bookModel into an actual model
//You get the insert(), remove(), update() through using the model