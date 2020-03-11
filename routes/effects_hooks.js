// model in question
const Effect = require('../models/effects.model');

// parent model, for appending effects:_id to listof_
const Character = require('../models/charas.model');

const Feature = require("../models/charas.model");

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');


module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'effects_hooks');

    // when 'make_new_effect' gets fired... CREATE_ONE
    socket.on('Make_new_effect', function(sent_in_data) {
        let neweffect = new Effect({
            _id: mongoose.Types.ObjectId(),
            target: mongoose.Schema.Types.ObjectId,

            value: "none",

            addby: False,
            multiplyby: False,
            maxvalof: False,
            minvalof: False,
            basevalof: False
        });

        Effect.SaveEffect(neweffect);

        Feature.AddToListofeffectsbyid(sent_in_data.chara_id, neweffect._id);

        socket.emit('Made_new_effect', neweffect);
        socket.broadcast.in(sent_in_data.chara_id).emit('Made_new_effect', neweffect);
    });


    // when get all cahra effect gets fired... READ_ALL
    socket.on('Get_all_chara_effects', function(sent_in_data) {
        // a_promise.then -> do stuff with the data
        Effect.GetAllEffect(sent_in_data.effectids).then(function(alleffect) {
            socket.emit('Receive_all_chara_effect', alleffect);
            socket.in(sent_in_data.charaid).emit('Receive_all_chara_effect', alleffect);
        });
    });

    // when 'update selected effect' gets fired... UPDATE_ONE
    socket.on('Update_selected_effect', function(sent_in_data) {
        Effect.findByIdAndUpdate(sent_in_data.effect._id, sent_in_data.effect, {new: true}, function(err, updatedEffect) {
            socket.emit('Updated_selected_effect', updatedEffect);
            socket.in(sent_in_data.charaid).emit('Updated_selected_effect', updatedEffect);
        });
    });

}
