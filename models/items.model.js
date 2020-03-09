const mongoose = require('mongoose');

var ItemSchema = mongoose.Schema({
    selected_color: String,

    descript: String,
    weight: Number,
    value: Number,
    attunement: Boolean,
    equipped: Boolean,
    listof_itemsfeatures: [mongoose.Schema.Types.ObjectId],
    listof_spells: [mongoose.Schema.Types.ObjectId],
    listof_effects: [mongoose.Schema.Types.ObjectId],
    listof_classfeatures: [mongoose.Schema.Types.ObjectId]
});


const Item = module.exports = mongoose.model('Items', ItemSchema);

// schema model functions -> {mongoose functions}

module.exports.SaveItems = function(itemobj) {
    itemobj.save();
}

module.exports.GetAllItems = function(allids) {
    var query = Container.find().where('_id').in(allids).exec();
    return query;
}
