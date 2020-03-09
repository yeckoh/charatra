// model in question
const Attak = require('../models/attacks.model');

// parent model, for appending Attack:_id to listof_
const Character = require('../models/charas.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');


module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'attack_hooks');

    // when 'make_new_attack' gets fired... CREATE_ONE
    socket.on('Make_new_attack', function(sent_in_data) {
        let newattack = new Attack({
            _id: mongoose.Types.ObjectId(),
            selected_color: "none",
            is_active: false,

            name: "none",
            details: "none",
            atkbonus: "none",
            damage: "none"
        });

        Attack.SaveAttack(newattack);

        /// TODO: supply specification for which listof_attacks
        Attack.AddToListofattacksbyid(sent_in_data.chara_id, newattack._id);

        socket.emit('Made_new_attack', newattack);
        socket.broadcast.in(sent_in_data.chara_id).emit('Made_new_attcak', newattcak);
    });


    // when get all cahra attacks gets fired... READ_ALL
    socket.on('Get_all_chara_attack', function(sent_in_data) {
        // a_promise.then -> do stuff with the data
        Attack.GetAllAttacks(sent_in_data.attacksids).then(function(allattcks) {
            socket.emit('Receive_all_chara_attack', allattcks);
            socket.in(sent_in_data.charaid).emit('Receive_all_chara_attacks', allattacks);
        });
    });

    // when 'update selected attacks' gets fired... UPDATE_ONE
    socket.on('Update_selected_attck', function(sent_in_data) {
        Attack.findByIdAndUpdate(sent_in_data.attack._id, sent_in_data.attack, {new: true}, function(err, updatedAttack) {
            socket.emit('Updated_selected_attack', updatedAttack);
            socket.in(sent_in_data.charaid).emit('Updated_selected_attack', updatedAttack);
        });
    });

}
