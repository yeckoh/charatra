const mongoose = require('mongoose');
require('./attacks.model');
require('./savethrows.model');

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
    listof_spellattacks: [mongoose.model('Attacks').schema],
    listof_spellsaves: [mongoose.model('Saving_Throws').schema],
});
  
  
const Spell = module.exports = mongoose.model('Spells', SpellSchema);
  
// schema model functions -> {mongoose functions}
