const mongoose = require('mongoose');

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

module.exports.AddToListofatksbyid = function(featureid, atkid) {
    Feature.findByIdAndUpdate(featureid, {$push: {listof_atks: [atkid] }}).exec();
}

module.exports.AddToListofsavesbyid = function(featureid, saveid) {
    Feature.findByIdAndUpdate(featureid, {$push: {listof_saves: [saveid] }}).exec();
}

// probably going to merge proficiencies into effects

module.exports.AddToListofeffectsbyid = function(featureid, effectid) {
    Feature.findByIdAndUpdate(featureid, {$push: {listof_effects: [effectid] }}).exec();
}
