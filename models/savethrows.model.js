const mongoose = require('mongoose');

var SavingThrowSchema = mongoose.Schema({
    selected_color: String,

    ownerfeature_id: String,
    name: String,
    details: String,
    saveDC: String,
    damage: String
});
  
  
  const SavingThrow = module.exports = mongoose.model('Saving_Throws', SavingThrowSchema);
  
  // schema model functions -> {mongoose functions}
