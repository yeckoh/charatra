const Spell = require('../models/spells.model');
const Spell_List = require('../models/spell_list.model');
const Character = require('../models/charas.model');

// const Attack = require('../models/attacks.model');
// const Saves = require('../models/savethrows.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');


module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'spell_hooks');

    // CREATE_ONE
    socket.on('Make_new_spell', function(sent_in_data) {
        // data is charaid, spelllistid
        let newspell = new Spell({
            _id: mongoose.Types.ObjectId(),
            selected_color: 'tomato',
            spellname: 'new spell',
            descript: 'description goes here',
            lvl: 0,
            cast_time: '1 action',
            range: '30ft',
            is_verbal_component: false,
            is_somatic_component: false,
            is_concentration: false,
            is_ritual: false,
            duration: '1 hr',
            listof_spellattacks: [],
            listof_spellsaves: [],
        });

        // no more separate collections. update subdocuments!
        Spell.SaveSpell(newspell);

        Spell_List.AddToSpells(sent_in_data.spelllistid, newspell._id);


        socket.emit('Created_new_spell', newspell);
        socket.broadcast.in(sent_in_data.charaid).emit('Created_new_spell', newspell);
    });

    // UPDATE_ONE
    socket.on('Update_selected_spell', function(sent_in_data) {
        // data is .spell obj .charaid
        Spell.findByIdAndUpdate(sent_in_data.spell._id, sent_in_data.spell, {new: true}, function(err, updatedSpell) {
            socket.emit('Updated_one_spell', updatedSpell); // send back to self, gotta replace list item then set selected to new listitem
            socket.broadcast.in(sent_in_data.charaid).emit('Updated_one_spell', updatedSpell); // make everyone else read_one
        });
    });

    socket.on('Delete_selected_spell', function(sent_in_data) {
        // data consists of .spellid .charaid
        Spell.DeleteCascading(sent_in_data.spellid);
        Spell_List.findByIdAndUpdate(sent_in_data.charaid, {$pull: {listof_spells: sent_in_data.spellid }}).exec(); // remove from parent
        console.log('spell deleted');
        // tell userid and charaid rooms that it was deleted here
        socket.emit('Deleted_one_spell', sent_in_data.spellid); // tell the deletor its gone
        socket.broadcast.in(sent_in_data.charaid).emit('Deleted_one_spell', sent_in_data.spellid); // tell all whos viewing this spell its gone
    });

}