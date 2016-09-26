// at the very top, include the database models
var db = require('../models');

var express = require('express');
var router = express.Router();

// require the passport configuration at the top of the file
var passport = require('../config/passport');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      username: req.body.username,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      // replace the contents of this if statement with the code below
      // FLASH
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      // FLASH
      req.flash('error', 'Email already exists');
      res.redirect('auth/signup');
    }
  }).catch(function(error) {
    console.log('error', error.message)
    // FLASH
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/notes/email',
  failureRedirect: '/auth/login',
  // FLASH
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.get('/note', function(req, res) {
  res.render('auth/note');
});

router.get('/logout', function(req, res) {
  // FLASH
  req.flash('success', 'You have logged out');
  req.logout();
  res.redirect('/');
});

module.exports = router;
