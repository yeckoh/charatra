// model in question
const Save = require('../models/savethrows.model');

// parent model, for appending Save:_id to listof_
const Feature = require('../models/features.model');
const Item = require('../models/items.model');
const Spell = require('../models/spells.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');


module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'savingthrow_hooks');

    // when 'make_new_Save' gets fired... CREATE_ONE
    socket.on('Make_new_save', function(sent_in_data) {
        let newsave = new Save({
            _id: mongoose.Types.ObjectId(),
            selected_color: "none",

            name: "new savingthrow",
            details: "save for half",
            saveDC: "{intDC} Dex",
            damage: "8d6 fire",

            parentFeature: sent_in_data.feature_id,
            parentItem: sent_in_data.item_id,
            parentSpell: sent_in_data.spell_id
        });
        Save.SaveSavingthrow(newsave);

        Feature.AddToListofsaves(sent_in_data.feature_id, newsave._id);
        Item.AddToListofsaves(sent_in_data.item_id, newsave._id);
        Spell.AddToListofsaves(sent_in_data.spell_id, newsave._id);

        socket.emit('Created_new_save', newsave);
        socket.broadcast.in(sent_in_data.chara_id).emit('Created_new_save', newsave);
    });


    // when get all chara Saves gets fired... READ_ALL
    socket.on('Get_all_saves', function(sent_in_data) {
        // a_promise.then -> do stuff with the data
        Save.GetAllSaves(sent_in_data.saveids).then(function(allsaves) {
            socket.emit('Read_all_saves', allsaves);
        });
    });

    // when 'update selected Saves' gets fired... UPDATE_ONE
    socket.on('Update_selected_save', function(sent_in_data) {
        // data is .save and .charaid
        Save.findByIdAndUpdate(sent_in_data.save._id, sent_in_data.save, {new: true}, function(err, updatedSave) {
            socket.broadcast.in(sent_in_data.charaid).emit('Updated_one_save', updatedSave);
        });
    });

    // separate hooks for features, items, and spells is probably better
    socket.on('Delete_feature_save', function(sent_in_data) {
        // data consists of .saveid .charaid .parentid
        Save.findById(sent_in_data.saveid).exec().then(function(deletedsave) {
            // technically we're telling the front we've fulfilled a promise before completing it :^)
            socket.emit('Deleted_feature_save', deletedsave); // tell the deletor its gone
            socket.broadcast.in(sent_in_data.charaid).emit('Deleted_feature_save', deletedsave); // tell all whos viewing this item its gone
        });
        Save.DeleteCascading(sent_in_data.saveid);
        Feature.findByIdAndUpdate(sent_in_data.parentid, {$pull: {listof_saves: sent_in_data.saveid }}).exec(); // remove from parent
        console.log('feature save deleted');
    });
    socket.on('Delete_item_save', function(sent_in_data) {
        // data consists of .saveid .charaid .parentid
        Save.findById(sent_in_data.saveid).exec().then(function(deletedsave) {
            // technically we're telling the front we've fulfilled a promise before completing it :^)
            socket.emit('Deleted_item_save', deletedsave); // tell the deletor its gone
            socket.broadcast.in(sent_in_data.charaid).emit('Deleted_item_save', deletedsave); // tell all whos viewing this item its gone
        });
        Save.DeleteCascading(sent_in_data.saveid);
        Item.findByIdAndUpdate(sent_in_data.parentid, {$pull: {listof_savingthrows: sent_in_data.saveid }}).exec(); // remove from parent
        console.log('item save deleted');
    });
    socket.on('Delete_spell_save', function(sent_in_data) {
        // data consists of .saveid .charaid .parentid
        Save.findById(sent_in_data.saveid).exec().then(function(deletedsave) {
            // technically we're telling the front we've fulfilled a promise before completing it :^)
            socket.emit('Deleted_spell_save', deletedsave); // tell the deletor its gone
            socket.broadcast.in(sent_in_data.charaid).emit('Deleted_spell_save', deletedsave); // tell all whos viewing this item its gone
        });
        Save.DeleteCascading(sent_in_data.saveid);
        Spell.findByIdAndUpdate(sent_in_data.parentid, {$pull: {listof_spellsaves: sent_in_data.saveid }}).exec(); // remove from parent
        console.log('spell save deleted');
    });

}
