const mongoose = require('mongoose');

var EffectSchema = mongoose.Schema({
    target: mongoose.Schema.Types.ObjectId,

    value: String,

    addby: Boolean,
    multiplyby: Boolean,
    maxvalof: Boolean,
    minvalof: Boolean,
    basevalof: Boolean
});


  const Effect = module.exports = mongoose.model('Effects', EffectSchema);

  // schema model functions -> {mongoose functions}


  module.exports.SaveEffect = function(effectobj) {
      effectobj.save();
  }

  module.exports.GetAllEffect = function(allids) {
      var query = Effect.find().where('_id').in(allids).exec();
      return query;
  }
