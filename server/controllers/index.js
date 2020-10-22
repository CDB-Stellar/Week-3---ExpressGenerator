//Index controller
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//Create the user model instance
let userModel = require('../models/user');
let User = userModel.User; //alias

//Main Navigations
//displayHomePage is a method
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''}); //render the index.ejs page
    //pass it 'title' property that has the value 'Express'
    //could pass multiple properties (Ex. title: 'Express', h1: 'Main Heading')
    //whatever you pass will be "injected" into the index.ejs file, you should have it there between <%= %>
}
module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {title: 'About', displayName: req.user ? req.user.displayName : ''}); 
}
module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', { title: 'Products', displayName: req.user ? req.user.displayName : ''}); 
}
module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services', displayName: req.user ? req.user.displayName : ''}); 
}
module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact Us', displayName: req.user ? req.user.displayName : ''}); 
}

//Login / Register / Logout
module.exports.displayLoginPage = (req, res, next) => {
    //check if the user is already logged in
    if (!req.user) //if they are not logged in
    {
        res.render('auth/login', {
            title: 'login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else //if they are already logged in
    {
        return res.redirect('/');
    }
}
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', 
    (err, user, info) => {
        // Is there a server err?
        if (err)
        {
            return next(err);
        }
        // Is there a user login error?
        if (!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // Server error?
            if (err)
            {
                return next(err);
            }
            return res.redirect('/book-list');
        });
    })(req, res, next);
}
module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if (!req.user) //if they are not logged in
    {
        res.render('auth/register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else //if they are already logged in
    {
        return res.redirect('/');
    }
}
module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a new user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err)
        {
            console.log('Error: Inserting New User');
            if (err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists');
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no error exists, registration is successful
            //redirect the user to authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/book-list')
            });
        }
    });
}
module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}