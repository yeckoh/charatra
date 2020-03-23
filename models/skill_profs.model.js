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
        acrobatics: 'dexMod',
        animal_handling: 'wisMod',
        arcana: 'intMod',
        athletics: 'strMod',
        deception: 'chaMod',
        history: 'intMod',
        insight: 'wisMod',
        intimidation: 'chaMod',
        investigation: 'intMod',
        medicine: 'wisMod',
        nature: 'intMod',
        perception: 'wisMod',
        performance: 'chaMod',
        persuasion: 'chaMod',
        religion: 'intMod',
        sleight_of_hand: 'dexMod',
        stealth: 'dexMod',
        survival: 'wisMod'
    });
    return newProfList;
}