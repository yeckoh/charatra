// model in question
const Feature = require('../models/features.model');

// parent model, for appending Feature:_id to listof_
const Character = require('../models/charas.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');


module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'feature_hooks');

    // when 'make_new_feature' gets fired...
    socket.on('Make_new_feature', function(sent_in_data) {
        let newfeature = new Feature({
            _id: mongoose.Types.ObjectId(),
            selected_color: 'rgb(127, 0, 0)',
            feature_category: 0, // user defined feature separation names

            title: 'new feature',
            descript: 'descriptions go here',
            uses: 1,
            uses_left: 1,
            toggleable: false,
            is_enabled: true,
            listof_atks: [],
            listof_saves: [],
            listof_featureprofs: []
        });

        Feature.SaveFeature(newfeature);

        /// TODO: supply specification for which listof_features
        Character.AddToListofbyid(sent_in_data.chara_id, newfeature._id);

        socket.emit('Made_new_feature', newfeature);
        socket.broadcast.in(sent_in_data.chara_id).emit('Made_new_feature', newfeature);
    });


    socket.on('Get_all_chara_features', function(sent_in_data) {
        // a_promise.then -> do stuff with the data
        Feature.GetAllFeatures(sent_in_data.featureids).then(function(allfeatures) {
            socket.emit('Receive_all_chara_features', allfeatures);
            socket.in(sent_in_data.charaid).emit('Receive_all_chara_features', allfeatures);
        });
    });

}