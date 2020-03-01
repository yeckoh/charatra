const mongoose = require('mongoose');

var AttackSchema = mongoose.Schema({
    selected_color: String,
    is_active: Boolean,
    
    name: String,
    details: String,
    atkbonus: String,
    damage: String
});
  
  
const Attack = module.exports = mongoose.model('Attacks', AttackSchema);
  
// schema model functions -> {mongoose functions}
