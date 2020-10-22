// require modules for user model
// you need a user model to be able to authenticate
let mongoose = require('mongoose')
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema //make a users collection schema
(
    {
        username: //create a user object
        {
            type: String,
            default: "",
            trim: true,
            required: "username is required"
        },
        /* (we do not need a password for a local account, but this is what it would look like)
        password:
        {
            type: String,
            default: "",
            trim: true,
            required: "password is required"
        } */
        email:
        {
            type: String,
            default: "",
            trim: true,
            required: "email address is required"
        },
        displayName:
        {
            type: String,
            default: "",
            trim: true,
            required: "Displayname is required"
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        update:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'users'
    }
);

// configure options for the User model
let options = ({missingPasswordError: 'Wrong/Missing password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);