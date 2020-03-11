// model in question
const Item = require('../models/items.model');

const Container = require('../models/containers.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');

module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'item_hooks');

    // when 'make_new_item' gets fired... CREATE_ONE
    socket.on('Make_new_item', function(sent_in_data) {
        let newitem = new Item({
            _id: mongoose.Types.ObjectId(),
            selected_color: 'rgb(127, 0, 0)',

            descript: 'description goes here',
            weight: 0,
            value: 0,
            attunement: false,
            equipped: false,
            listof_itemsfeatures: [],
            listof_spells: []
        });

        Item.SaveItem(newitem);

        Container.AddToListofitems(sent_in_data.container_id, newitem._id);

        socket.emit('Made_new_item', newitem);
        socket.broadcast.in(sent_in_data.container_id).emit('Made_new_item', newitem);
    });


    // when get all Item gets fired... READ_ALL
    socket.on('Get_all_chara_items', function(sent_in_data) {
        // a_promise.then -> do stuff with the data
        Items.GetAllItems(sent_in_data.itemids).then(function(allItems) {
            socket.emit('Receive_all_chara_items', allItems);
        });

    });

    // when 'update selected item' gets fired... UPDATE_ONE
    socket.on('Update_selected_item', function(sent_in_data) {
        Item.findByIdAndUpdate(sent_in_data.item._id, sent_in_data.item, {new: true}, function(err, updatedItem) {
            socket.broadcast.in(sent_in_data.charaid).emit('Updated_selected_item', updatedItem);
        });
    });

}
