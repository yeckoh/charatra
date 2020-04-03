const mongoose = require('mongoose');

const Attack = require('./attacks.model');
const Saves = require('./savethrows.model');

var FeatureSchema = mongoose.Schema({
    selected_color: String,
    feature_category: Number, // user defined feature separation names

    title: String,
    descript: String,
    uses: Number,
    uses_left: Number,
    toggleable: Boolean,
    is_enabled: Boolean,
    listof_atks: [{type: mongoose.Schema.Types.ObjectId, ref:'Attacks'}],
    listof_saves: [{type: mongoose.Schema.Types.ObjectId, ref:'Saving_Throws'}],
});


const Feature = module.exports = mongoose.model('Features', FeatureSchema);

// schema model functions -> {mongoose functions}



//=========================================================================
// stuff for socket hooks
//=========================================================================

module.exports.SaveFeature = function(featureobj) {
    featureobj.save();
}

module.exports.GetAllFeatures = function(allids) {
    var query = Feature.find().where('_id').in(allids).exec();
    return query;
}

module.exports.AddToListofattacks = function(featureid, atkid) {
    Feature.findByIdAndUpdate(featureid, {$push: {listof_atks: [atkid] }}).exec();
}

module.exports.AddToListofsaves = function(featureid, saveid) {
    Feature.findByIdAndUpdate(featureid, {$push: {listof_saves: [saveid] }}).exec();
}

// DEPRECIATED
// module.exports.AddToListofeffectsbyid = function(featureid, effectid) {
//     Feature.findByIdAndUpdate(featureid, {$push: {listof_effects: [effectid] }}).exec();
// }

module.exports.DeleteCascading = function(featureids) {
    Feature.find().where('_id').in(featureids).exec().then((features) => {
        let atkids = [];
        let saveids = [];
        features.forEach(element => {
            atkids.push(...element.listof_atks);
            saveids.push(...element.listof_saves);
        });
        Attack.DeleteCascading(atkids);
        Saves.DeleteCascading(saveids);
    });
    Feature.deleteMany({_id: featureids}).exec();
}
