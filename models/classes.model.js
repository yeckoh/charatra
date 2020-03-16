const mongoose = require('mongoose');

var ClassSchema = mongoose.Schema({
    selected_color: String, // we probably wont use this for classes

    class_hitpoints: Number,
    class_level: Number,
    caster_level: Number,
});


const Class = module.exports = mongoose.model('Classes', ClassSchema);

// schema model functions -> {mongoose functions}

module.exports.SaveClass = function(classobj) {
    classobj.save();
}

module.exports.GetAllClasses = function(allids) {
    var query = Class.find().where('_id').in(allids).exec();
    return query;
}
