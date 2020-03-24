const mongoose = require('mongoose');
// require('./spells.model');

var Spell_listSchema = mongoose.Schema({
    selected_color: String,
    
    name: String,
    saveDC: String,
    atk_bonus: String,
    max_prepared: Number,
    listof_spells: [{type: mongoose.Schema.Types.ObjectId, ref:'Spells'}]
});
  
  
const Spell_list = module.exports = mongoose.model('Spell_list', Spell_listSchema);


module.exports.MakeNewList = function() {
    let newspelllist = new Spell_list({
        selected_color: 'blueviolet',
        name: 'new list',
        saveDC: '8+intMod+profBonus',
        atk_bonus: 'intMod+profbonus',
        max_repared: 0,
        listof_spells: []
    });
    newspelllist.save();
    return newspelllist._id;
}

// schema model functions -> {mongoose functions}
