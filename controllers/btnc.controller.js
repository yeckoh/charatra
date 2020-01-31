/// defines the entrypoint for the chara controller
// controllers specify get and post behavior
// models specify what objects we're getting, including what fields they have
const express = require('express');

// express routering lets http requests map to database url requests
var router = express.Router();

// import objectId from mongoose
var ObjectId = require('mongoose').Types.ObjectId;


// we want to get/post data, which model/table are we interested in?
// var name must match model export
var { btnmodel } = require('../models/btnc.model');


function validate_by_id(req, res) {
  if(!ObjectId.isValid(req.params.id))
    return res.stats(400).send(`No record with given id : ${req.params.id}`);
};


// GET ALL
// define the GET request for the CRUDbase.btn_counter
// ref localhost:3000/btn
router.get('/', (req, res) => {
    btnmodel.find((err, docs) => {
      if(!err) res.send(docs); // send from database to frontend
      else {
        console.log('An error has occured when retrieving all buttoncounters');
      }
    });
});

// to ref something like localhost:3000/btn/list
// router.get('/list', (req, res) => {

// SAVE NEW
// define the POST request for CRUDbase.btn_counter
// ref localhost:3000/btn
router.post('/', (req, res) => {
  var newbtn = new btnmodel({
    presses: req.body.presses,
    other_presses: req.body.other_presses
  });
  newbtn.save((err, doc) => {
    if(!err) res.send(doc);
    else console.log('An error occured when btn_counter saving');
  });
});


// GET ONE
// define a GET for a specific record, supplying a known _id
// localhost:3000/btn/id
router.get('/:id', (req, res) => {
  // make sure supplied id is valid
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  btnmodel.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else console.log('An error has occured when retrieving the btn_counter that exists');
  });
});



// define routes for UPDATE and DELETE
// UPDATE - given a unique _id, update their info
router.put('/:id', (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.stats(400).send(`No record with given id : ${req.params.id}`);

    var btn = { // normal object - send json data containing keyvalues
      presses: req.body.presses,
      other_presses: req.body.other_presses
    };
    btnmodel.findByIdAndUpdate(req.params.id, { $set: btn}, { new: true}, (err, doc) => {
      if (err) console.log('An error occured when updating the existing btn_counter');
      else res.send(doc);
    });
  });


  // DELETE ONE
router.delete('/:id', (req, res) =>{
  if(!ObjectId.isValid(req.params.id))
    return res.stats(400).send(`No record with given id : ${req.params.id}`);

  btnmodel.findByIdAndDelete(req.params.id, (err, doc) => {
    if(err) console.log('An error occured when deleting the btn_counter');
    else res.send(doc);
  });
});






module.exports = router;
