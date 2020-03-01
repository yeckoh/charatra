const mongoose = require('mongoose');

var ClassSchema = mongoose.Schema({
    selected_color: String, // we probably wont use this for classes
    
    class_hitpoints: Number,
    class_level: Number,
    caster_level: Number,
    listof_classspell_list: [mongoose.Schema.Types.ObjectId],
    listof_classfeatures: [mongoose.Schema.Types.ObjectId]
});
  
  
const Class = module.exports = mongoose.model('Classes', ClassSchema);
  
// schema model functions -> {mongoose functions}
