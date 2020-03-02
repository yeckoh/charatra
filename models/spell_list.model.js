const mongoose = require('mongoose');

var Spell_listSchema = mongoose.Schema({
    selected_color: String,
    
    name: String,
    saveDC: Number,
    atk_bonus: Number,
    max_prepared: Number,
    listof_spells: [mongoose.Schema.Types.ObjectId]
});
  
  
const Spell_list = module.exports = mongoose.model('Spell_list', Spell_listSchema);
  
// schema model functions -> {mongoose functions}
