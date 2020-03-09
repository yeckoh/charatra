/// defines the entrypoint for the chara model

const mongoose = require('mongoose');

/// TODO: HITDICE


// create a chara model
var CharaSchema = mongoose.Schema({
  selected_color: String,
  feature_category0: String, // user defined feature separation names
  feature_category1: String,
  feature_category2: String,
  feature_category3: String,

  current_hitpoints: Number,
  deathsaves: Number, // -3 to 3 for now. -3:3 maps -> 3fails, 3successes

  stats:{
    str: Number,
    dex: Number,
    con: Number,
    int: Number,
    wis: Number,
    cha: Number,
    NatAC: Number,
    total_AC: Number,
    total_speed: Number,
    total_hitpoints: Number,
    // total_hitdice: Number, <-- potentially separate into its own model
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
    gender: String,
    description: String,
    personality: String,
    ideals: String,
    bonds: String,
    race: {
      actualrace: String,
      listof_racefeatures: [mongoose.Schema.Types.ObjectId],
      racespelllist: mongoose.Schema.Types.ObjectId
    },
    background: {
      actualbackground: String,
      listof_backgroundfeatures: [mongoose.Schema.Types.ObjectId]
    }
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


const Character = module.exports = mongoose.model('Characters', CharaSchema);

// schema model functions -> {mongoose functions}



//=========================================================================
// stuff for socket hooks
//=========================================================================

module.exports.SaveCharacter = function(charaobj) {
  charaobj.save(); // equivalent
  // charaobj.save(function(err, forwarddata) {
  //   return forwarddata;
  // } );
}

module.exports.GetAllCharacters = function(allids) {
  console.log(allids);
  // returns a promise
  var query = Character.find().where('_id').in(allids).exec();
  return query;
}

module.exports.GetOneCharacter = function(charaid) {
  // returns a promise
  var query = Character.findById(charaid).exec();
  return query;
}

module.exports.UpdateOneCharacter = function(charaobj) {
  Character.findByIdAndUpdate(charaobj._id, charaobj).exec();
  // charaobj.save(); nogood
  // Character.save();
}

/// TODO: supply specification for which character.listof_features
module.exports.AddToListofmanualfeaturesbyid = function(charaid, featureid) {
  Character.findByIdAndUpdate(charaid, {$push: {listof_charamanualfeatures: [featureid] }}).exec(); //equivalent
}

module.exports.AddToListofcharainventorybyid = function(charaid, featureid) {
  Character.findByIdAndUpdate(charaid, {$push: {listof_charainventorylist: [featureid] }}).exec(); //equivalent
}
