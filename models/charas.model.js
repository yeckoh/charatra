/// defines the entrypoint for the chara model

const mongoose = require('mongoose');
require('./containers.model');
// require('./features.model');
// require('./classes.model');
require('./skill_profs.model');
// require('./spell_list.model');

/// TODO: HITDICE


// create a chara model
var CharaSchema = mongoose.Schema({
  selected_color: String,

  current_hitpoints: Number,
  deathsaves: Number, // -3 to 3 for now. -3:3 maps -> 3fails, 3successes

  stats:{
    str: Number,
    dex: Number,
    con: Number,
    int: Number,
    wis: Number,
    cha: Number,
    baseAC: Number,
    speed: Number,
    level: Number,
  },
  formuolis: {
    hitpoints: String,
    initiative: String,
    proficiency: String
  },
  saves: {
    str: String,
    dex: String,
    con: String,
    int: String,
    wis: String,
    cha: String,
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
    race: String,
    background: String,
  },

  skills: mongoose.model('Skill_Profs').schema,

  // equipped_itemcontainer: mongoose.model('Containers').schema, // a containerid
  // inventory_container: mongoose.model('Containers').schema, // a containerid
  equipped_itemcontainer: {type: mongoose.Schema.Types.ObjectId, ref: 'Containers'}, // a containerid
  inventory_container: {type: mongoose.Schema.Types.ObjectId, ref: 'Containers'}, // a containerid


  // REVISIT: list of extra containers instead of a single extracontainer
  extra_characontainer: {type: mongoose.Schema.Types.ObjectId, ref: 'Containers'}, // a list of containerids
  listof_characlasses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Classes'}], // a list of classes
  //  listof_charafeatures: [mongoose.model('Features').schema], // a list of features
  listof_charafeatures: [{type: mongoose.Schema.Types.ObjectId, ref: 'Features'}], // a list of features
  listof_spelllists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Spell_list'}],

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
  var query = Character.findById(charaid)
  .populate({
    path: 'listof_charafeatures',
    populate: {path: 'listof_atks'}
  })
  .populate({ // we cant populate multiple paths from one command
    path: 'listof_charafeatures',
    populate: {path: 'listof_saves'}
  })
  .populate({
    path: 'equipped_itemcontainer',
    populate: {
      path: 'listof_items',
      populate: {
        path: 'listof_attacks'
      }}
  })
  .populate({
    path: 'equipped_itemcontainer',
    populate: {
      path: 'listof_items',
      populate: {
        path: 'listof_savingthrows'
      }}
  })
  .exec();




  // var query = Character.findById(charaid)
  // .populate({
  //   path: 'listof_charafeatures',
  //   populate: {path: 'listof_atks'}
  // })
  // .populate({
  //   path: 'listof_charafeatures',
  //   populate: {path: 'listof_saves'}
  // })
  // .exec();
  return query;
}

module.exports.UpdateOneCharacter = function(charaobj) {
  Character.findByIdAndUpdate(charaobj._id, charaobj).exec();
}

// add new character feature
module.exports.AddToListoffeatures = function(charaid, feature) {
  Character.findByIdAndUpdate(charaid, {$push: {listof_charafeatures: [feature] }}).exec();
}

// add a new container to the character
module.exports.AddToListofcharacontainersbyid = function(charaid, containerid) {
  Character.findByIdAndUpdate(charaid, {$push: {listof_characontainers: [containerid] }}).exec();
}

module.exports.AddToListofother_profsbyid = function(charaid, other_profid) {
  // TODO: add list insinside the chara model to append data to
}
