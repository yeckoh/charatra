const mongoose = require('mongoose');
// require('./attacks.model');
// require('./savethrows.model');

var SpellSchema = mongoose.Schema({
    spellname: String,
    descript: String,
    lvl: Number,
    cast_time: String,
    range: String,
    is_verbal_component: Boolean,
    is_somatic_component: Boolean,
    is_concentration: Boolean,
    is_ritual: Boolean,
    duration: String,
    listof_spellattacks: [{type: mongoose.Schema.Types.ObjectId, ref:'Attacks'}],
    listof_spellsaves: [{type: mongoose.Schema.Types.ObjectId, ref:'Saving_Throws'}],
});
  
  
const Spell = module.exports = mongoose.model('Spells', SpellSchema);
  
// schema model functions -> {mongoose functions}
