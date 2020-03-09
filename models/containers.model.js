const mongoose = require('mongoose');

var ContainerSchema = mongoose.Schema({

    name: String,
    descript: String,
    listof_equippeditems: [mongoose.Schema.Types.ObjectId],
    listof_unequippeditems: [mongoose.Schema.Types.ObjectId]
});


const Container = module.exports = mongoose.model('Containers', ContainerSchema);

// schema model functions -> {mongoose functions}

module.exports.SaveContainers = function(containersobj) {
    containersobj.save();
}

module.exports.GetAllContainers = function(allids) {
    var query = Container.find().where('_id').in(allids).exec();
    return query;
}

module.exports.AddToListofequippeditems = function(item) {
  //To Do: push item to equipped Items
}

module.exports.AddToListofunequippeditems = funtion(item) {
  //To Do: push item to unequippeditems
}

module.exports.toggleEquipStatus = funtion(item) {
  //To Do: inverts the status of the equipment
  // EX. if equiped make it unequipped
}
