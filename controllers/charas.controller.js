/// defines the entrypoint for the chara controller
// controllers specify get and post behavior
// models specify what objects we're getting, including what fields they have
const express = require('express');

// express routering lets http requests map to database url requests
var router = express.Router();

// import objectId from mongoose
var ObjectId = require('mongoose').Types.ObjectId;


// we want to get/post data, which model/table are we interested in?
var { charas } = require('../models/chara.model');


function validate_by_id(req, res) {
  if(!ObjectId.isValid(req.params.id))
    return res.stats(400).send(`No record with given id : ${req.params.id}`);
};



// define the GET request for the CRUDbase.charas
// ref localhost:3000/charas
router.get('/', (req, res) => {
    charas.find((err, docs) => {
      if(!err) res.send(docs); // send from database to frontend
      else {
        console.log('An error has occured when retrieving all charas');
      }
    });
});

// to ref something like localhost:3000/charas/list
// router.get('/list', (req, res) => {

// define the POST request for CRUDbase.charas
// this saves a new chara object to the database
router.post('/', (req, res) => {
  // gotta create an object of the chara model class
  // from the request body: send json data of new chara. Then using that data fill the fields.
  // ie: create an object of mongoose model chara as character, and fill with supplied data
  var character = new chara({
    name: req.body.name,
    desc: req.body.desc,
    str: req.body.str,
    dex: req.body.dex,
    con: req.body.con,
    int: req.body.int,
    wis: req.body.wis,
    cha: req.body.cha,
    ac: req.body.ac,
    lvl: req.body.lvl
  });
  // then to save the new record to the database
  // use callbacks to trace errors
  // if successful, mongodb will return an object containing details of the newly inserted record
  // as doc with the properties defined above
  // mongodb will also add another property to the object, id. ie: a primarykey
  character.save((err, doc) => {
    if(!err) res.send(doc); // return the newly inserted doc back to the response
    else console.log('An error occured when character saving');
  });


// define a GET request for a specific record, supplying a known _id
router.get('/:id', (req, res) => {
  // make sure supplied id is valid
  if(!ObjectId.isValid(req.params.id))
    return res.stats(400).send(`No record with given id : ${req.params.id}`);
  charas.findById(req.params.id, (err, doc) => {
    if (!err) res.send(doc);
    else console.log('An error has occured when retrieving the chara that exists');
  });
});


// define routes for UPDATE and DELETE
// UPDATE - given a unique _id, update their info
router.put('/:id', (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.stats(400).send(`No record with given id : ${req.params.id}`);

    var character = { // normal object - send json data containing keyvalues
      name: req.body.name,
      desc: req.body.desc,
      str: req.body.str,
      dex: req.body.dex,
      con: req.body.con,
      int: req.body.int,
      wis: req.body.wis,
      cha: req.body.cha,
      ac: req.body.ac,
      lvl: req.body.lvl
    };

    // the magic. findbyid, set/overwrite the data, return all the data when true[res.send doc], callback_func
    // new: false only returns the updated data
    charas.findByIdAndUpdate(req.params.id, { $set: character}, { new: true}, (err, doc) => {
      if (err) console.log('An error occured when updating the existing chara');
      else res.send(doc);
    });

router.delete('/:id', (req, res) =>{
  if(!ObjectId.isValid(req.params.id))
    return res.stats(400).send(`No record with given id : ${req.params.id}`);

  charas.findByIdAndDelete(req.params.id, (err, doc) => {
    if(err) console.log('An error occured when deleting the chara');
    else res.send(doc);
  });

});


});



});

module.exports = router;
