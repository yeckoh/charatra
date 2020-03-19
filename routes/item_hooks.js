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

            name: '',
            descript: 'description goes here',
            count: 1,
            weight: 0,
            value: 0,
            attunement: false,
            // equipped: false,
            // listof_itemsfeatures: [],
            // listof_spells
            listof_attacks: [],
            listof_savingthrows: []
        });

        Item.SaveItem(newitem);

        Container.AddToListofitems(sent_in_data.container_id, newitem._id);

        socket.emit('Created_new_item', newitem);
        socket.broadcast.in(sent_in_data.container_id).emit('Created_new_item', newitem);
    });


    // when get all Item gets fired... READ_ALL
    socket.on('Get_all_container_items', function(sent_in_data) {
        // a_promise.then -> do stuff with the data
        Items.GetAllItems(sent_in_data.itemids).then(function(allItems) {
            socket.emit('Read_all_chara_items', allItems);
        });
    });

    // when 'update selected item' gets fired... UPDATE_ONE
    socket.on('Update_selected_item', function(sent_in_data) {
        Item.findByIdAndUpdate(sent_in_data.item._id, sent_in_data.item, {new: true}, function(err, updatedItem) {
            socket.broadcast.in(sent_in_data.charaid).emit('Updated_one_item', updatedItem);
        });
    });

    /// TODO: BRING IN PARENT CONTAINER ID
    /// TODO: DETERMINE FRONT LOGIC CASES: DO WE EMIT BROADCAST THE SAME OR DIFFERENT HOOKS?
    socket.on('Delete_selected_item', function(sent_in_data) {
        // data consists of .itemid .charaid .parentid
        Item.DeleteCascading(sent_in_data.itemid);
        Container.findByIdAndUpdate(sent_in_data.parentid, {$pull: {listof_items: sent_in_data.itemid }}).exec(); // remove from parent
        console.log('item deleted');
        // tell userid and charaid rooms that it was deleted here
        socket.emit('Deleted_one_item', sent_in_data.itemid); // tell the deletor its gone
        socket.broadcast.in(sent_in_data.charaid).emit('Deleted_this_item', sent_in_data.itemid); // tell all whos viewing this item its gone
    });


}
