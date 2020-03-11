// model in question
const Character = require('../models/charas.model');

// parent model, for appending Character:_id to listof_
const User = require('../models/user.model');

// make unique containers for equipped and inventory
const Container = require('../models/containers.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');

module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'character_hooks');

    // CREATE_ONE
    socket.on('Make_new_chara', function(sent_in_data) {

        let newchara = new Character( {
            _id: mongoose.Types.ObjectId(),
            selected_color: 'none',
            feature_category0:'none', // user defined feature separation names
            feature_category1:'none',
            feature_category2:'none',
            feature_category3:'none',
            
            current_hitpoints: 0,
            deathsaves: 0,

            spellslots: {
                first: 0,
                second: 0,
                third: 0,
                fourth: 0,
                fifth: 0,
                sixth: 0,
                seventh: 0,
                eighth: 0,
                ninth: 0
            },

            persona: {
                name: sent_in_data.name,
                gender: sent_in_data.gender,
                description: '',
                personality: '',
                ideals: '',
                bonds: '',
                race: {
                    actualrace: sent_in_data.race,
                    listof_racefeatures: [],
                    racespelllist: undefined // ObjectID
                },
                background: {
                    actualbackground: '',
                    listof_backgroundfeatures: []
                }
            },

            skills: undefined,

            equipped_itemcontainer: Container.MakeNewEquipmentContainer(),
            inventory_container: Container.MakeNewInventoryContainer(),
            listof_characontainers: [],
            listof_characlasses: [],
            listof_charafeatures: [],

            special_stuff: {
                superiority_dice: 0,
                expertise_dice: 0,
                sorcery_points: 0,
                ki_points: 0,
                rage_dmg: 0,
                other_name: 'user_defined',
                other_number: 0
            }
        });


        // save new character
        Character.SaveCharacter(newchara);

        // update user, append id to listof_charas
        User.AddToListofbyid(sent_in_data.userid, newchara.id);

        socket.emit('Created_new_chara', newchara); // send back to client who called
        socket.broadcast.in(sent_in_data.userid).emit('Created_new_chara', newchara); // send to all in the room but the caller
        


    });

    // READ_ALL
    /// TODO: pull names and ids only to save on data transfers
    socket.on('Get_all_user_charas', function(sent_in_data) {
        // a_promise.then -> do stuff with the data
        Character.GetAllCharacters(sent_in_data.characterids).then(function(allcharacters) {
            socket.emit('Read_all_user_charas', allcharacters); // send to to caller
        });
    });

    // READ_ONE
    socket.on('Get_selected_chara', function(sent_in_data) {
        Character.GetOneCharacter(sent_in_data.characterid).then(function(singlechara) {
            socket.emit('Updated_one_chara', singlechara); // send to caller
        });
    });

    // UPDATE_ONE
    socket.on('Update_selected_chara', function(sent_in_data) {
        Character.UpdateOneCharacter(sent_in_data.chara);
        /// TODO: after sidenav only reads charaname and id, update charaname only below
        socket.broadcast.in(sent_in_data.userid).emit('Updated_one_chara', sent_in_data.chara); // send back to originator
        socket.broadcast.in(sent_in_data.chara._id).emit('Updated_one_chara', sent_in_data.chara); // send to all who's viewing this chara
    });



}











// socket.emit('wemakenewcharacternow', sent_in_data); // send back to client who called
// socket.broadcast.emit('wemakenewcharacternow', sent_in_data); // send to everyone but the caller