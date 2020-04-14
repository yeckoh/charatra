// Other_Profs// model in question
// const Other_Prof = require('../models/other_profs.model');

// // parent model, for appending Other_Prof:_id to listof_
// const Character = require('../models/charas.model');

// // import mongoose just to generate a _id: right here, right now
// var mongoose = require('mongoose');


// module.exports = function(socket) {
//     console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'other_prof_hooks');

//     // CREATE_ONE
//     socket.on('Make_new_other_prof', function(sent_in_data) {
//         let newother_prof = new Other_Prof({
//             _id: mongoose.Types.ObjectId(),
//             category: "none",
//             name: "none"
//         });

//         Other_Prof.SaveOther_Prof(newother_prof);

//         /// TODO: supply specification for which listof_other_profs
//         Character.AddToListofother_profsbyid(sent_in_data.chara_id, newother_prof._id);
//         // item other_profs
//         // spell other_profs

//         socket.emit('Created_new_other_prof', newother_prof, owner);
//         socket.broadcast.in(sent_in_data.chara_id).emit('Created_new_other_prof', newother_prof, owner);
//     });


//     // READ_ALL
//     socket.on('Get_all_chara_other_profs', function(sent_in_data) {
//         // a_promise.then -> do stuff with the data
//         Other_Prof.GetAllOther_Profs(sent_in_data.other_profids).then(function(allOther_Profs) {
//             socket.emit('Read_all_chara_other_profs', allOther_Profs);
//         });
//     });

//     // UPDATE_ONE
//     socket.on('Update_selected_other_prof', function(sent_in_data) {
//         Other_Prof.findByIdAndUpdate(sent_in_data.other_prof._id, sent_in_data.other_prof, {new: true}, function(err, updatedOther_Prof) {
//             socket.emit('Updated_one_other_prof', updatedOther_Prof); // send back to self, gotta replace list item then set selected to new listitem
//             socket.broadcast.in(sent_in_data.charaid).emit('Updated_one_other_prof', updatedOther_Prof); // make everyone else read_one
//         });
//     });

// }
