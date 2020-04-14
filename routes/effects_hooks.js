// // model in question
// const Effect = require('../models/effects.model');

// // parent model, for appending effects:_id to listof_
// const Feature = require("../models/features.model");

// // import mongoose just to generate a _id: right here, right now
// var mongoose = require('mongoose');


// module.exports = function(socket) {
//     console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'effects_hooks');

//     // when 'make_new_effect' gets fired... CREATE_ONE
//     socket.on('Make_new_effect', function(sent_in_data) { // feature_id, charaid, targetstat,
//         let neweffect = new Effect({
//             _id: mongoose.Types.ObjectId(),
//             targetstat: sent_in_data.targetstat,

//             value: "none",

//             addby: False,
//             multiplyby: False,
//             maxvalof: False,
//             minvalof: False,
//             basevalof: False
//         });

//         Effect.SaveEffect(neweffect);

//         Feature.AddToListofeffectsbyid(sent_in_data.feature_id, neweffect._id);

//         socket.emit('Made_new_effect', neweffect);
//         socket.broadcast.in(sent_in_data.chara_id).emit('Made_new_effect', neweffect);
//     });


//     // when get all cahra effect gets fired... READ_ALL
//     socket.on('Get_all_chara_effects', function(sent_in_data) {
//         // a_promise.then -> do stuff with the data
//         Effect.GetAllEffect(sent_in_data.effectids).then(function(alleffects) {
//             socket.emit('Read_all_chara_effects', alleffects);
//         });
//     });

//     // when 'update selected effect' gets fired... UPDATE_ONE
//     socket.on('Update_selected_effect', function(sent_in_data) {
//         Effect.findByIdAndUpdate(sent_in_data.effect._id, sent_in_data.effect, {new: true}, function(err, updatedEffect) {
//             socket.emit('Updated_one_effect', updatedEffect);
//             socket.broadcast.in(sent_in_data.charaid).emit('Updated_one_effect', updatedEffect);
//         });
//     });

// }
