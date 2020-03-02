const mongoose = require('mongoose');

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
    listof_spellsfeatures: [mongoose.Schema.Types.ObjectId]
});
  
  
const Spell = module.exports = mongoose.model('Spells', SpellSchema);
  
// schema model functions -> {mongoose functions}
