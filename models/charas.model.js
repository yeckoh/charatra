/// defines the entrypoint for the chara model, or table columns
// routes specify get and post behavior
// models specify what objects we're getting from mongoDB, including what fields they oughtta have

const mongoose = require('mongoose');

// create a chara model
var CharaShema = mongoose.Schema({
  selected_color: String,
  feature_category0: String, // user defined feature separation names
  feature_category1: String,
  feature_category2: String,
  
  current_hitpoints: Number,

  stats:{
    desc: String,
    str: Number,
    dex: Number,
    con: Number,
    int: Number,
    wis: Number,
    cha: Number,
    NatAC: Number,
    total_hitpoints: Number,
    total_lvl: Number,
    total_proficiencybonus: Number,
    total_casterlvl: Number
  },

  spellslots: {
    first: Number,
    second: Number,
    third: Number,
    fourth: Number,
    fifth: Number,
    sixth: Number,
    seventh: Number,
    eighth: Number,
    ninth: Number
  },

  persona: {
    name: String,
    race: {
      actualrace: String,
      listof_racefeatures: [mongoose.Schema.Types.ObjectId],
      racespelllist: mongoose.Schema.Types.ObjectId
    },
    background: {
      actualbackground: String,
      listof_backgroundfeatures: [mongoose.Schema.Types.ObjectId]
    },
    ideals: String,
    bonds: String
  },

  skills: mongoose.Schema.Types.ObjectId,

  listof_characlass: [mongoose.Schema.Types.ObjectId],
  listof_charainventorylist: [mongoose.Schema.Types.ObjectId],
  listof_charamanualfeatures: [mongoose.Schema.Types.ObjectId],

  special_stuff: {
    superiority_dice: Number,
    expertise_dice: Number,
    sorcery_points: Number,
    ki_points: Number,
    rage_dmg: Number,
    other_name: String,
    other_number: Number
  }
});


const Character = module.exports = mongoose.model('Character', CharaSchema);

// schema model functions -> {mongoose functions}

module.exports.addCharacter = function(charaobj, callback) {
  Character.save(charaobj);
}