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
    listof_atks: [mongoose.Schema.Types.ObjectId],
    listof_saves: [mongoose.Schema.Types.ObjectId],
    listof_featureprofs: [mongoose.Schema.Types.ObjectId]
});


const Feature = module.exports = mongoose.model('Features', FeatureSchema);

// schema model functions -> {mongoose functions}



//=========================================================================
// stuff for socket hooks
//=========================================================================
