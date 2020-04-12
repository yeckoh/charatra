const mongoose = require('mongoose');
const Spell = require('./spells.model');

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


module.exports.DeleteCascading = function(spelllistids) {
    Spell_list.find().where('_id').in(spelllistids).exec().then((spelllist) => {
        let spellids = [];
        spelllist.forEach(element => {
            spellids.push(...element.listof_spells);
        });
        Spell.DeleteCascading(spellids);
    });
    Spell_list.deleteMany({_id: spelllistids}).exec();
}


module.exports.AddToSpells = function(spelllistid, spellid) {
    Spell_list.findByIdAndUpdate(spelllistid, {$push: {listof_spells: [spellid] }}).exec();
}