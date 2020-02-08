const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../dbconnect');

const User = require('../models/user.model');

// using localhost:3000/users/

// REGISTER
router.post('/register', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
      console.log('a register failed');
    } else {
      res.json({success: true, msg:'User registered'});
      console.log('a register was successful');
    }
  });
});

// AUTHENTICATE
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => { // if exists
    if(err) throw err;
    if(!user) {
      console.log('/auth tried to post a missing user');
      return res.json({success: false, msg: 'user not found'});
    }
    User.comparePassword(password, user.password,(err, isMatch)=> { // match by password
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, db.secret, {
          expiresIn: 604800 // one week
        });
        res.json({ // send on match
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        });
        console.log('/auth post authentication success')
      }
      else { console.log('/auth wrong pass supplied'); return res.json({success: false, msg: 'wrong pasword'}); }
    });
  });
});

// profile protection route
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email
  }});
});



module.exports = router;
