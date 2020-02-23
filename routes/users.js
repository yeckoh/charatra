const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../dbconnect');

const User = require('../models/user.model');
const buttonmodel = require('../models/btnc.model');

// import objectId from mongoose
var ObjectId = require('mongoose').Types.ObjectId;


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
    User.comparePassword(password, user.password, (err, isMatch) => { // match by password
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, db.secret, {
          expiresIn: 604800 // one week
        });
        console.log('/auth post authentication success');
        res.json({ // send on match
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            charas: user.buttontest_id
          }
        });

      }
      else { console.log('/auth wrong pass supplied'); return res.json({success: false, msg: 'wrong pasword'}); }
    });
  });
});

// profile protection route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email
  }});
});

// HTTP RFC => no body in GET requests. this is nice for postman but completely dead
// router.get('/profile/:id/getbtn', (req, res) => {
//   console.log('users/profile/id/btnget GET called');
//   if(!ObjectId.isValid(req.body.buttontest_id))
//   return res.status(400).send(`No record with given buttontest_id : ${req.body.buttontest_id}`);
//   User.grabButton(req.body.buttontest_id, (err, button) =>{
//     if(err)
//     console.log('there was an issue with user.grabButton');
//     else {
//       res.send({
//         button: {
//           _id: button._id,
//           presses: button.presses,
//           other_presses: button.other_presses
//         }});
//     }
//   });
// });

router.post('/profile/:id/getbtn', (req, res) => {
  User.grabButton(req.body.buttontest_id, (err, button) =>{
    if(err)
    console.log('there was an issue with user.grabButton');
    else {
      res.send({
        button: {
          _id: button._id,
          presses: button.presses,
          other_presses: button.other_presses
        }});
    }
  });
});





router.get('/profile/:id', (req, res) => {
  
  // if(!ObjectId.isValid(req.params.id))
  // return res.status(400).send(`No record with given id : ${req.params.id}`);
  User.findById(req.params.id, (err, doc) => {
  if (!err) { res.send(doc); }
  else console.log('An error has occured when retrieving the chara that exists');

  // const buttonid = req.btn.buttontest_id;
  // let btnobj = User.
  // res.json({
  //   btn: {
  //     _id: req.btn.buttontest_id,
  //     presses: req.btn.presses,
  //     other_presses: req.btn.other_presses
  //   }
  });
});


module.exports = router;
