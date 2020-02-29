const express = require('express');
const router = express.Router();
// //const passport = require('passport');
// //const jwt = require('jsonwebtoken');
const db = require('../dbconnect');



// import objectId from mongoose
var ObjectId = require('mongoose').Types.ObjectId;


// // we want to get/post data, which model/table are we interested in?
// // var name must match model export
// // use { var } if exporting manually in model
// // use var if exporting by schema. Any function calls then go into the model
// const { btnmodel } = require('../models/btnc.model');
const buttonmodel = require('../models/btnc.model');


// // GET ALL
// // define the GET request for the CRUDbase.btn_counter
// // ref localhost:3000/mybutton
// // router.get('/', (req, res) => {
// //     btnmodel.find((err, docs) => {
// //       if(!err) {
// //         res.send(docs);
// //        } // send from database to frontend
// //       else {
// //         console.log('An error has occured when retrieving all buttoncounters');
// //       }
// //     });
// // });
// /// GET ONE
// router.get('/', (req, res) => {
//     btnmodel.findOne((err, docs) => {
//       if(!err) {
//         res.send(docs);
//        } // send from database to frontend
//       else {
//         console.log('An error has occured when retrieving all buttoncounters');
//       }
//     });
// });

// // SAVE NEW
// // define the POST request for CRUDbase.btn_counter
// // ref localhost:3000/mybutton
// router.post('/', (req, res) => {
//     console.log('/mybutton POST new called')
//   var newbtn = new btnmodel({
//     presses: req.body.presses,
//     other_presses: req.body.other_presses
//   });
//   newbtn.save((err, doc) => {
//     if(!err) res.send(doc);
//     else console.log('An error occured when btn_counter saving');
//   });
// });


// // GET ONE
// // define a GET for a specific record, supplying a known _id
// localhost:3000/mybutton/id
router.get('/:id', (req, res) => {
  // make sure supplied id is valid
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);
    buttonmodel.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else console.log('An error has occured when retrieving the btn_counter that exists');
  });
});



// define routes for UPDATE and DELETE
// UPDATE - given a unique _id, update their info
router.put('/:id', (req, res) => {
//     console.log('/buttonroute/ put called');
//   if(!ObjectId.isValid(req.params.id)){
//     console.log('a btn put request failed: no valid id supplied!');
//     return res.stats(400).send(`No record with given id : ${req.params.id}`);
//   }
    var btn = { // normal object - send json data containing keyvalues
      presses: req.body.presses,
      other_presses: req.body.other_presses
    };
    buttonmodel.findByIdAndUpdate(req.params.id, { $set: btn}, { new: true}, (err, doc) => {
      if (err) console.log('An error occured when updating the existing btn_counter');
      else res.send(doc);
    });
  });


//   // DELETE ONE
// router.delete('/:id', (req, res) =>{
//   if(!ObjectId.isValid(req.params.id))
//     return res.stats(400).send(`No record with given id : ${req.params.id}`);

//     btnmodel.findByIdAndDelete(req.params.id, (err, doc) => {
//     if(err) console.log('An error occured when deleting the btn_counter');
//     else res.send(doc);
//   });
// });



module.exports = router;