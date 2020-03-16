const mongoose = require('mongoose');

var SkillProfSchema = mongoose.Schema({
    acrobatics: String,
    animal_handling: String,
    arcana: String,
    athletics: String,
    deception: String,
    history: String,
    insight: String,
    intimidation: String,
    investigation: String,
    medicine: String,
    nature: String,
    perception: String,
    performance: String,
    persuasion: String,
    religion: String,
    sleight_of_hand: String,
    stealth: String,
    survival: String
});
  
  
const Skill_Prof = module.exports = mongoose.model('Skill_Profs', SkillProfSchema);
  
// schema model functions -> {mongoose functions}


module.exports.MakeProficiencies = function() {
    let newProfList = new Skill_Prof ({
        acrobatics: 'DexMod',
        animal_handling: 'WisMod',
        arcana: 'IntMod',
        athletics: 'StrMod',
        deception: 'ChaMod',
        history: 'IntMod',
        insight: 'WisMod',
        intimidation: 'ChaMod',
        investigation: 'IntMod',
        medicine: 'WisMod',
        nature: 'IntMod',
        perception: 'WisMod',
        performance: 'ChaMod',
        persuasion: 'ChaMod',
        religion: 'IntMod',
        sleight_of_hand: 'DexMod',
        stealth: 'DexMod',
        survival: 'WisMod'
    });
    return newProfList;
}