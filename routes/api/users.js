'use strict'

const express = require('express');
const router = express.Router();
const User = require('../../models/user');
var passport = require('passport');

// Collection
router.route('/')
  // List
  .get(passport.authenticate('facebook-token'), function(req, res) {
    User.find({}).sort({ createdAt: -1 }).exec()
    .then(function(users) {
      return res.json(users);
    })
    .catch(function(err){
      return res.send(err);
    });
  })

// Single
router.route('/:id')
  .get(passport.authenticate('facebook-token'), function(req, res) {
    User.findById(req.params.id).exec()
    .then(function(user) {
      return res.json(user);
    })
    .catch(function(err){
      return res.send(err);
    });
  })
  .delete(passport.authenticate('facebook-token'), function(req, res) {
    User.remove({ _id: req.params.id }).exec()
    .then(function() {
      return res.json({ message: 'User has been removed!' });
    })
    .catch(function(err){
      return res.send(err);
    });
  });

module.exports = router;
