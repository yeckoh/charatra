const mongoose = require('mongoose');
require('./attacks.model');
require('./savethrows.model');

var ItemSchema = mongoose.Schema({
    selected_color: String,

    descript: String,
    weight: Number,
    value: Number,
    attunement: Boolean,
    // equipped: Boolean,
    listof_attacks: [mongoose.model('Attacks').schema],
    listof_savingthrows: [mongoose.model('Saving_Throws').schema]
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
