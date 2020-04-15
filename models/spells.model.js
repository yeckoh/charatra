const mongoose = require('mongoose');
const Attack = require('./attacks.model');
const Saves = require('./savethrows.model');

var SpellSchema = mongoose.Schema({
    selected_color: String,
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
  

module.exports.SaveSpell = function(spell) {
    spell.save();
}
// schema model functions -> {mongoose functions}

module.exports.AddToListofattacks = function(spellid, atkid) {
    Spell.findByIdAndUpdate(spellid, {$push: {listof_spellattacks: [atkid] }}).exec();
}

module.exports.AddToListofsaves = function(spellid, saveid) {
    Spell.findByIdAndUpdate(spellid, {$push: {listof_spellsaves: [saveid] }}).exec();
}

module.exports.DeleteCascading = function(spellids) {
    Spell.find().where('_id').in(spellids).exec().then((spells) => {
        let atkids = [];
        let saveids = [];
        spells.forEach(element => {
            atkids.push(...element.listof_spellattacks);
            saveids.push(...element.listof_spellsaves);
        });
        Attack.DeleteCascading(atkids);
        Saves.DeleteCascading(saveids);
    });
    Spell.deleteMany({_id: spellids}).exec();
}