const mongoose = require('mongoose');
// require('./spells.model');

var Spell_listSchema = mongoose.Schema({
    selected_color: String,
    
    name: String,
    saveDC: Number,
    atk_bonus: Number,
    max_prepared: Number,
    listof_spells: [{type: mongoose.Schema.Types.ObjectId, ref:'Spells'}]
});
  
  
const Spell_list = module.exports = mongoose.model('Spell_list', Spell_listSchema);
  
// schema model functions -> {mongoose functions}
