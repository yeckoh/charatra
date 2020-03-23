const mongoose = require('mongoose');

var SavingThrowSchema = mongoose.Schema({
    selected_color: String,

    name: String,
    details: String,
    saveDC: String,
    damage: String,

    parentFeature: mongoose.Schema.Types.ObjectId,
    parentItem: mongoose.Schema.Types.ObjectId,
    parentSpell: mongoose.Schema.Types.ObjectId
});
  
  
  const SavingThrow = module.exports = mongoose.model('Saving_Throws', SavingThrowSchema);
  
  // schema model functions -> {mongoose functions}

  // for testing subdoc popyulate only
  module.exports.MakeASavingThrow = function() {
    let newsave = new SavingThrow({
      name: 'Fireball',
      details: 'save for half',
      saveDC: '{intDC} dex',
      damage: '8d6 fire'
    });
    newsave.save();
    return newsave._id;
  }
  

  module.exports.DeleteCascading = function(saveids) {
    SavingThrow.deleteMany({_id: saveids}).exec();
}