/// defines the entrypoint for the chara model, or table columns
// controllers specify get and post behavior
// models specify what objects we're getting from mongoDB, including what fields they oughtta have

const mongoose = require('mongoose');

// create a chara model
var charamodel = mongoose.model('charas', {
  name: { type: String },
  desc: { type: String },
  str: { type: Number },
  dex: { type: Number },
  con: { type: Number },
  int: { type: Number },
  wis: { type: Number },
  cha: { type: Number },
  ac: { type: Number },
  lvl: { type: Number }
});

// gotta export as an object {} for other files to see/use
// ES6 specs allow inference of same names   charas:charas -> charas
module.exports = {
  charamodel
};
