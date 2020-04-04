// model in question
const ArmorMod = require('../models/armor_modifiers.model');

// parent models
const Feature = require('../models/features.model');
const Item = require('../models/items.model');


module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'armor_hooks');


    // UPDATE_ONE
    socket.on('Update_selected_armormod', function(sent_in_data) {
        // data is .charaid .armormod
        ArmorMod.findByIdAndUpdate(sent_in_data.armormod._id, sent_in_data.armormod, {new: true}, function(err, updatedArmormod) {
            socket.emit('Updated_selected_armormod', updatedArmormod);
            socket.in(sent_in_data.charaid).emit('Updated_selected_armormod', updatedArmormod);
        });
    });

}
