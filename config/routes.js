const express = require('express')
const router = express.Router()
var db = require('../models')

var passport = require('../config/passport');
var currentUserLoggedIn
var noteId
var noteTitle
var noteBody

router.get('/', function(req, res) {
  res.render('index')
});

router.get('/users', function(req, res) {
  db.user.findAll().then(function(data) {
    res.json(data)
  });
})

router.post('/users', function(req, res){
  db.user.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }).then(function(data) {
    res.json(data)
  });
})

router.get('/notes', function(req, res) {
  currentUserLoggedIn = req.user.username;
  db.note.findAll().then(function(data) {
    res.render('users-home', {currentUserLoggedIn: currentUserLoggedIn, data: data})
  });
})

router.post('/notes', function(req, res){
  db.note.create({
    title: req.body.title,
    body: req.body.body
  }).then(function(data) {
    res.json(data)
  });
})

router.get('/notes/new', function(req, res) {
  currentUserLoggedIn = req.user.username;
  res.render('notes-new', {currentUserLoggedIn: currentUserLoggedIn})
})

router.get('/notes/:id', function(req, res) {
  db.note.find({
    where: {id: req.params.id}
  }).then(function(data) {
    res.json(data)
  });
})

router.delete('/notes/:id', function(req, res) {
  db.note.destroy({
    where: {id: req.params.id}
  }).then(function(data) {
    res.json(data)
  });
})

router.put('/notes/:id', function(req, res) {
  db.note.update({
    title: req.body.title,
    body: req.body.body
    }, {
    where: {
      id: req.params.id
    }
  }).then(function(data) {
    res.json(data)
  });
})

module.exports = router
