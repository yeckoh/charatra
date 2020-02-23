
const mongoose = require('mongoose');
const db = require('../dbconnect');



// this works if we dont need to specify functions
// in routes -> must use {varname} = require(modelpath)
// in routes -> varname.find() pulls all mongodb data

// const btnmodel = mongoose.model('btn_counters', {
//   presses: { type: Number },
//   other_presses: { type: Number }
// });


// module.exports = {
//   btnmodel
// };


// using a schema lets us specify our own function names to call from the routes
// in routes -> use varname = require(modelpath)

const btnmodel = mongoose.Schema({
  presses: {
    type: Number,
    required: true
  },
  other_presses: {
    type: Number
  }
});

const Button = module.exports = mongoose.model('btn_counters', btnmodel);

// TODO: how to return the results from this function so the caller can res.send(data) or res.json(data)
/// TODO: create and delete functions, or go straight for Characters instead of more testbutton stuff

module.exports.getButton = function (btn_id, callback) {
  // console.log("getbutton btn_id:");
  // console.log(btn_id);
  const query = {buttontest_id: btn_id};
  Button.findById(btn_id, callback);
}

module.exports.updateBtn = function (btnobj, callback) { // is this update or save new...? oops!
  var newbtn = new btnmodel({
    presses: btnobj.presses,
    other_presses: btnobj.other_presses
  });
  newbtn.save((err, doc) => {
    if(!err) res.send(doc);
    else console.log('An error occured when btn_counter saving the updates');
  });
}