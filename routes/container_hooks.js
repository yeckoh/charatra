// model in question
const Container = require('../models/containers.model');

// parent model, for appending Feature:_id to listof_
const Character = require('../models/charas.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');


module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'container_hooks');

    // CREATE_ONE
    socket.on('Make_new_container', function(sent_in_data) { // sent_in is a charaid
        let newcontainer = new Container({
            _id: mongoose.Types.ObjectId(),

            name: 'new container',
            descript: 'descriptions go here',
            listof_equippeditems: [],
            listof_unequippeditems: []
        });

        Container.SaveContainers(newcontainer);

        Character.AddToListofcharainventorybyid(sent_in_data, newcontainer._id);

        socket.emit('Made_new_container', newcontainer);
        socket.broadcast.in(sent_in_data).emit('Made_new_container', newcontainer);
    });


    // // READ_ALL
    // socket.on('Get_all_chara_containers', function(sent_in_data) { // sent_in is a list of containerids belonging to chara
    //     // a_promise.then -> do stuff with the data
    //     Container.GetAllContainers(sent_in_data.containerids).then(function(allContainers) {
    //         socket.emit('Read_all_chara_containers', allContainers);
    //     });
    // });

    // UPDATE_ONE
    socket.on('Update_selected_container', function(sent_in_data) {
      // sentindata is a .charaid, a .itemid, newcontainer, oldcontainer
      let swapids = {
          oldcontainer: sent_in_data.oldcontainer._id,
          newcontainer: sent_in_data.newcontainer._id,
          itemid: sent_in_data.itemid
      }
        Container.findByIdAndUpdate(sent_in_data.newcontainer._id, sent_in_data.newcontainer).exec();
        Container.findByIdAndUpdate(sent_in_data.oldcontainer._id, sent_in_data.oldcontainer, {new: true}, function(err, updatedContainer) {
            swapids.oldcontainer = sent_in_data.oldcontainer._id;
          socket.emit('Updated_one_container', swapids);
          socket.broadcast.in(sent_in_data.charaid).emit('Updated_one_container', swapids);
          console.log('item swapped');
        });
    });

    /// UNUSED UNLESS CHARACTERS CAN HAVE A LIST OF ANY NUMBER OF CONTAINERS
    /// TODO: figure out which list is getting deleted if we use this
    // socket.on('Delete_selected_container', function(sent_in_data) {
    //     // sentindata has .containerid .charaid
    //     Container.DeleteCascading(sent_in_data.containerid);
    //     // Character.findByIdAndUpdate(sent_in_data.charaid, {$pull: {listof_charafeatures: sent_in_data.featureid }}).exec(); // remove from parent
    //     console.log('container deleted');
    //     // tell userid and charaid rooms that it was deleted here
    //     socket.emit('Deleted_one_container', sent_in_data.featureid); // tell the deletor its gone
    //     socket.broadcast.in(sent_in_data.charaid).emit('Deleted_one_container', sent_in_data.containerid); // tell all whos viewing this container its gone
    // });

}
