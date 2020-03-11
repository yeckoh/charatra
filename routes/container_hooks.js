// model in question
const Container = require('../models/containers.model');

// parent model, for appending Feature:_id to listof_
const Character = require('../models/charas.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');


module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'container_hooks');

    // when 'Make_new_Container' gets fired... CREATE_ONE
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


    // when get all containers gets fired... READ_ALL
    socket.on('Get_all_chara_containers', function(sent_in_data) { // sent_in is a list of containerids belonging to chara
        // a_promise.then -> do stuff with the data
        Container.GetAllContainers(sent_in_data.containerids).then(function(allContainers) {
            socket.emit('Read_all_chara_containers', allContainers);
        });
    });

    // when 'update selected container' gets fired... UPDATE_ONE
    socket.on('Update_selected_container', function(sent_in_data) {
        Container.findByIdAndUpdate(sent_in_data.container._id, sent_in_data.container, {new: true}, function(err, updatedContainer) {
            socket.emit('Updated_one_container', updatedContainer);
            socket.broadcast.in(sent_in_data.charaid).emit('Updated_one_container', updatedContainer);
        });
    });

}
