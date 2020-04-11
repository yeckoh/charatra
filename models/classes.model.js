const mongoose = require('mongoose');

var ClassSchema = mongoose.Schema({
    selected_color: String, // we probably wont use this for classes

    class_name: String,
    class_hitpoints: String,
    class_level: Number,
    caster_level: String,
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

module.exports.MakeNewClass = function() {
    let newclass = new Class({
        selected_color: 'tomato',
        class_name: 'Fightman',
        class_hitpoints: '(6+conMod)*level+4',
        class_level: 1,
        caster_level: 'class_level*1'
    });
    newclass.save();
    return newclass._id;
}

module.exports.DeleteCascading = function(classid) {
  console.log(classid.toString());
  Class.deleteMany({_id: classid.toString()}).exec();
}
