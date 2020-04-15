// model in question
const Feature = require('../models/features.model');

// parent model, for appending Feature:_id to listof_
const Character = require('../models/charas.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');


module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'feature_hooks');

    // when 'make_new_feature' gets fired... CREATE_ONE
    socket.on('Make_new_feature', function(sent_in_data) {
        let newfeature = new Feature({
            _id: mongoose.Types.ObjectId(),
            selected_color: 'rgb(55, 55, 55)',
            feature_category: 0, // user defined feature separation names

            title: 'new feature',
            descript: 'descriptions go here',
            uses: 0,
            uses_left: 0,
            toggleable: false,
            is_enabled: true,
            listof_atks: [],
            listof_saves: [],
            listof_featureprofs: []
        });

        // no more separate collections. update subdocuments!
        Feature.SaveFeature(newfeature);

        Character.AddToListoffeatures(sent_in_data.chara_id, newfeature._id);


        socket.emit('Created_new_feature', newfeature);
        socket.broadcast.in(sent_in_data.chara_id).emit('Created_new_feature', newfeature);
    });

    // UPDATE_ONE
    socket.on('Update_selected_feature', function(sent_in_data) {
        Feature.findByIdAndUpdate(sent_in_data.feature._id, sent_in_data.feature, {new: true}, function(err, updatedFeature) {
            socket.emit('Updated_one_feature', updatedFeature); // send back to self, gotta replace list item then set selected to new listitem
            socket.broadcast.in(sent_in_data.charaid).emit('Updated_one_feature', updatedFeature); // make everyone else read_one
        });
    });

    socket.on('Delete_selected_feature', function(sent_in_data) {
        // data consists of .featureid .charaid
        Feature.DeleteCascading(sent_in_data.featureid);
        Character.findByIdAndUpdate(sent_in_data.charaid, {$pull: {listof_charafeatures: sent_in_data.featureid }}).exec(); // remove from parent
        console.log('feature deleted');
        // tell userid and charaid rooms that it was deleted here
        socket.emit('Deleted_one_feature', sent_in_data.featureid); // tell the deletor its gone
        socket.broadcast.in(sent_in_data.charaid).emit('Deleted_one_feature', sent_in_data.featureid); // tell all whos viewing this feature its gone
    });

}
