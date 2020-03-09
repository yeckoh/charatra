// model in question
const Container = require('../models/containers.model');

// parent model, for appending Feature:_id to listof_
const Character = require('../models/charas.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');


module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'Container_hooks');

    // when 'Make_new_Container' gets fired... CREATE_ONE
    socket.on('Make_new_Container', function(sent_in_data) {
        let newcontainer = new Container({
            _id: mongoose.Types.ObjectId(),

            name: '',
            descript: 'descriptions right here bub',
            listof_equippeditems: [],
            listof_unequippeditems: []
        });

        Container.SaveContainer(newcontainer);

        Character.AddToListofbyid(sent_in_data.chara_id, newcontainer._id);

        socket.emit('Made_new_Container', newcontainer);
        socket.broadcast.in(sent_in_data.chara_id).emit('Made_new_Container', newcontainer);
    });


    // when get all cahra Container gets fired... READ_ALL
    socket.on('Get_all_chara_Container', function(sent_in_data) {
        // a_promise.then -> do stuff with the data
        Container.GetAllContainer(sent_in_data.Containerids).then(function(allContainer) {
            socket.emit('Receive_all_chara_Container', allContainer);
            socket.in(sent_in_data.charaid).emit('Receive_all_chara_Container', allContainer);
        });
    });

    // when 'update selected Container' gets fired... UPDATE_ONE
    socket.on('Update_selected_Container', function(sent_in_data) {
        Container.findByIdAndUpdate(sent_in_data.Container._id, sent_in_data.Container, {new: true}, function(err, updatedContainer) {
            socket.emit('Updated_selected_Container', updatedContainer);
            socket.in(sent_in_data.charaid).emit('Updated_selected_Container', updatedContainer);
        });
    });

}
