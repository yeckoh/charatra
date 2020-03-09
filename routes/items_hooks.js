// model in question
const Item = require('../models/items.model');

const Container = require('../models/containers.model');

const Character = require('../models/charas.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');

module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'item_hooks');

    // when 'make_new_item' gets fired... CREATE_ONE
    socket.on('Make_new_item', function(sent_in_data) {
        let newitem = new Item({
            _id: mongoose.Types.ObjectId(),
            selected_color: 'rgb(127, 0, 0)',

            descript: 'description go here',
            weight: 0,
            value: 0,
            attunement: false,
            equipped: false,
            listof_itemsfeatures: [],
            listof_spells: [],
            listof_effects: [],
            listof_classfeatures: []
        });

        Item.SaveItem(newItem);

        if (eqipped) {
          Container.AddToListofequippeditems(newItem);
        }
        else {
          Container.AddToListofunequippeditems(newItem);
        }

        socket.emit('Made_new_item', newItem);
        socket.broadcast.in(sent_in_data.container_id).emit('Made_new_item', newItem);
    });


    // when get all Item gets fired... READ_ALL
    socket.on('Get_all_chara_items', function(sent_in_data) {
        // a_promise.then -> do stuff with the data

        // I am not a 100% certain this works
        Items.GetAllItems(sent_in_data.Itemids).then(function(allItems) {
            socket.emit('Receive_all_chara_items', allItems);
            socket.in(sent_in_data.charaid).emit('Receive_all_chara_items', allItems);
        });

    });

    // when 'update selected item' gets fired... UPDATE_ONE
    socket.on('Update_selected_item', function(sent_in_data) {
        Item.findByIdAndUpdate(sent_in_data.item._id, sent_in_data.item, {new: true}, function(err, updatedItem) {
            socket.emit('Updated_selected_item', updatedItem);
            socket.in(sent_in_data.charaid).emit('Updated_selected_item', updatedItem);
        });
    });

}
