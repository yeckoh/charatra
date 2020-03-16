const mongoose = require('mongoose');
// require('./attacks.model');
// require('./savethrows.model');

var ItemSchema = mongoose.Schema({
    selected_color: String,

    descript: String,
    weight: Number,
    value: Number,
    attunement: Boolean,
    // equipped: Boolean,
    listof_attacks: [{type: mongoose.Schema.Types.ObjectId, ref:'Attacks'}],
    listof_savingthrows: [{type: mongoose.Schema.Types.ObjectId, ref:'Saving_Throws'}],
});


const Item = module.exports = mongoose.model('Items', ItemSchema);

// schema model functions -> {mongoose functions}

module.exports.SaveItem = function(itemobj) {
    itemobj.save();
}

module.exports.GetAllItems = function(allids) {
    var query = Container.find().where('_id').in(allids).exec();
    return query;
}
