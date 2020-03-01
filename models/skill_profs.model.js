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
    persuation: String,
    religion: String,
    sleight_of_hand: String,
    stealth: String,
    survival: String
});
  
  
const Skill_Prof = module.exports = mongoose.model('Skill_Profs', SkillProfSchema);
  
// schema model functions -> {mongoose functions}
