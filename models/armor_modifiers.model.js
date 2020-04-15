const mongoose = require('mongoose');

var ArmorModSchema = mongoose.Schema({
    
    parentFeature: mongoose.Schema.Types.ObjectId, // probably unused
    parentItem: mongoose.Schema.Types.ObjectId,
    parentSpell: mongoose.Schema.Types.ObjectId, // probably unused

    usebase: Boolean,
    usemax: Boolean,
    useadd: Boolean,
    baseac: Number,
    maxac: Number,
    addac: Number
});


  const ArmorMod = module.exports = mongoose.model('Armor_Modifiers', ArmorModSchema);

  // schema model functions -> {mongoose functions}


  module.exports.SaveArmorMod = function(acmod) {
      acmod.save();
  }


  // module.exports.MakeNewFeatureArmor = function(featureid) {
  //   let newArmor = new ArmorMod({
  //       parentFeature: featureid,
  //       parentItem: undefined,
  //       parentSepl: undefined,

  //       usebase: true,
  //       usemax: false,
  //       useadd: false,
  //       baseac: 10,
  //       maxac: 128,
  //       addac: 128
  //   });
  //   newArmor.save();
  //   return newArmor._id;
  // }

  module.exports.MakeNewItemArmor = function(itemid) {
    let newArmor = new ArmorMod({
        parentFeature: undefined,
        parentItem: itemid,
        parentSepl: undefined,

        usebase: true,
        usemax: false,
        useadd: false,
        baseac: 10,
        maxac: 128,
        addac: 128
    });
    newArmor.save();
    return newArmor;
  }


  module.exports.DeleteCascading = function(allids) {
    ArmorMod.deleteMany({_id: allids}).exec();
  }
