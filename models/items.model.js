const mongoose = require('mongoose');
// nested testing only
const Attack = require('../models/attacks.model');
const Saves = require('../models/savethrows.model');

var ItemSchema = mongoose.Schema({
    selected_color: String,

    name: String,
    descript: String,
    weight: Number,
    count: Number,
    value: Number,
    attunement: Boolean,
    // equipped: Boolean,
    // parentContainerid: mongoose.Schema.Types.ObjectId,
    listof_attacks: [{type: mongoose.Schema.Types.ObjectId, ref:'Attacks'}],
    listof_savingthrows: [{type: mongoose.Schema.Types.ObjectId, ref:'Saving_Throws'}]
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

// for testing only
module.exports.MakeNewItem = function() {
    let newitem = new Item({
        name: 'newitem',
        descript: 'this is a new item',
        count: 1,
        weight: 123,
        value: 357,
        attunement: false,
        listof_attacks: [],
        listof_savingthrows: []
    });
    newitem.save();
    return newitem._id;
}

module.exports.AddToListofattacks = function(itemid, atkid) {
    Item.findByIdAndUpdate(itemid, {$push: {listof_attacks: [atkid] }}).exec();
}

module.exports.AddToListofsaves = function(itemid, saveid) {
    Item.findByIdAndUpdate(itemid, {$push: {listof_savingthrows: [saveid] }}).exec();
}

module.exports.DeleteCascading = function(itemids) {
    Item.find().where('_id').in(itemids).exec().then((items) => {
        let atkids = [];
        let saveids = [];
        items.forEach(element => {
            atkids.push(...element.listof_attacks);
            saveids.push(...element.listof_savingthrows);
        });
        Attack.DeleteCascading(atkids);
        Saves.DeleteCascading(saveids);
    });
    Item.deleteMany({_id: itemids}).exec();
}


/*
            listof_atks: [Attack.MakeNewAttack()],
            listof_saves: [Saves.MakeASavingThrow()],
*/