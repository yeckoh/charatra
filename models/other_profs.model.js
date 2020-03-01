const mongoose = require('mongoose');

var OtherProfSchema = mongoose.Schema({
    category: String,
    name: String
});
  
  
  const Other_Prof = module.exports = mongoose.model('Other_Profs', OtherProfSchema);
  
  // schema model functions -> {mongoose functions}
