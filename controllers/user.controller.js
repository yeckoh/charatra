const express = require('express');
const router = express.Router();
//const passport = require('passport');
//const jwt = require('jsonwebtoken');

const User = require('../models/user.model');


// register
router.post('/register', (req, res, next)=>{
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) =>{
    if(err)
      res.json({success: false, msg:'failed to register user'});
      else
      res.json({success: true, msg:'user registered successfully'});
  });
}); // end post/register



