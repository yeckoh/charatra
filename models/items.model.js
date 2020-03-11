const mongoose = require('mongoose');

var ItemSchema = mongoose.Schema({
    selected_color: String,

    descript: String,
    weight: Number,
    value: Number,
    attunement: Boolean,
    // equipped: Boolean,
    listof_itemsfeatures: [mongoose.Schema.Types.ObjectId],
    listof_spells: [mongoose.Schema.Types.ObjectId]
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
