
const mongoose = require('mongoose');

// create a chara model
var btnmodel = mongoose.model('btn_counter', {
  presses: { type: Number },
  other_presses: { type: Number }
});

// gotta export as an object {} for other files to see/use
// ES6 specs allow inference of same names   charas:charas -> charas
module.exports = {
  btnmodel
};
