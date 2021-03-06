const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(passport); // pass passport for configuration
const permission = require('../config/permission');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function(req, res){
    res.render('login',{message: req.flash('loginMessage')});
});

router.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup', { message: req.flash('signupMessage') });
});

router.get('/profile', permission.isLoggedIn, function(req, res) {
    console.log(req.user);
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/catalog', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/catalog', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));



module.exports = router;
