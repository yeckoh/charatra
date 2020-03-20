// model in question
const Attack = require('../models/attacks.model');

// parent model, for appending Attack:_id to listof_
const Feature = require('../models/features.model');
const Item = require('../models/items.model');
const Spell = require('../models/spells.model');

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

            name: "new attack",
            details: "Versatile (1d10)",
            atkbonus: "{strMod+profBonus}",
            damage: "1d8 + {strMod} slashing",

            parentFeature: sent_in_data.feature_id,
            parentItem: sent_in_data.item_id,
            parentSpell: sent_in_data.spell_id
        });
        Attack.SaveAttack(newattack);

        Feature.AddToListofattacks(sent_in_data.feature_id, newattack._id);
        Item.AddToListofattacks(sent_in_data.item_id, newattack._id);
        Spell.AddToListofattacks(sent_in_data.spell_id, newattack._id);

        socket.emit('Created_new_attack', newattack);
        socket.broadcast.in(sent_in_data.chara_id).emit('Created_new_attack', newattack);
    });


    // when get all chara attacks gets fired... READ_ALL
    socket.on('Get_all_chara_attacks', function(sent_in_data) {
        // a_promise.then -> do stuff with the data
        Attack.GetAllAttacks(sent_in_data.attacksids).then(function(allattacks) {
            socket.emit('Read_all_chara_attacks', allattacks);
        });
    });

    // when 'update selected attacks' gets fired... UPDATE_ONE
    socket.on('Update_selected_attack', function(sent_in_data) {
        // data is .attack and .charaid
        Attack.findByIdAndUpdate(sent_in_data.attack._id, sent_in_data.attack, {new: true}, function(err, updatedAttack) {
            socket.broadcast.in(sent_in_data.charaid).emit('Updated_one_attack', updatedAttack);
        });
    });

    // separate hooks for features, items, and spells is probably better
    socket.on('Delete_feature_attack', function(sent_in_data) {
        // data consists of .attackid .charaid .parentid
        Attack.findById(sent_in_data.attackid).exec().then(function(deletedattack) {
            // technically we're telling the front we've fulfilled a promise before completing it :^)
            socket.emit('Deleted_feature_attack', deletedattack); // tell the deletor its gone
            socket.broadcast.in(sent_in_data.charaid).emit('Deleted_feature_attack', deletedattack); // tell all whos viewing this item its gone
        });
        Attack.DeleteCascading(sent_in_data.attackid);
        Feature.findByIdAndUpdate(sent_in_data.parentid, {$pull: {listof_atks: sent_in_data.attackid }}).exec(); // remove from parent
        console.log('feature attack deleted');
    });
    socket.on('Delete_item_attack', function(sent_in_data) {
        // data consists of .attackid .charaid .parentid
        Attack.findById(sent_in_data.attackid).exec().then(function(deletedattack) {
            // technically we're telling the front we've fulfilled a promise before completing it :^)
            socket.emit('Deleted_item_attack', deletedattack); // tell the deletor its gone
            socket.broadcast.in(sent_in_data.charaid).emit('Deleted_item_attack', deletedattack); // tell all whos viewing this item its gone
        });
        Attack.DeleteCascading(sent_in_data.attackid);
        Item.findByIdAndUpdate(sent_in_data.parentid, {$pull: {listof_attacks: sent_in_data.attackid }}).exec(); // remove from parent
        console.log('item attack deleted');
    });
    socket.on('Delete_spell_attack', function(sent_in_data) {
        // data consists of .attackid .charaid .parentid
        Attack.findById(sent_in_data.attackid).exec().then(function(deletedattack) {
            // technically we're telling the front we've fulfilled a promise before completing it :^)
            socket.emit('Deleted_spell_attack', deletedattack); // tell the deletor its gone
            socket.broadcast.in(sent_in_data.charaid).emit('Deleted_spell_attack', deletedattack); // tell all whos viewing this item its gone
        });
        Attack.DeleteCascading(sent_in_data.attackid);
        Spell.findByIdAndUpdate(sent_in_data.parentid, {$pull: {listof_spellattacks: sent_in_data.attackid }}).exec(); // remove from parent
        console.log('spell attack deleted');
    });

}
