const mongoose = require('mongoose');

var ContainerSchema = mongoose.Schema({

    name: String,
    descript: String,
    listof_items: [mongoose.Schema.Types.ObjectId]
});


const Container = module.exports = mongoose.model('Containers', ContainerSchema);

// schema model functions -> {mongoose functions}

module.exports.MakeNewEquipmentContainer = function() {
  let newContainer = new Container({
    name: 'Equipped',
    descript: 'Worn or active items go here',
    listof_items: []
  })
  newContainer.save();
  return newContainer._id;
}

module.exports.MakeNewInventoryContainer = function() {
  let newContainer = new Container({
    name: 'Inventory',
    descript: 'Your inventory',
    listof_items: []
  })
  newContainer.save();
  return newContainer._id;
}


module.exports.SaveContainers = function(containersobj) {
    containersobj.save();
}

module.exports.GetAllContainers = function(allids) {
    var query = Container.find().where('_id').in(allids).exec();
    return query;
}

module.exports.AddToListofitems = function(containerid, itemid) {
  Character.findByIdAndUpdate(containerid, {$push: {listof_items: [itemid] }}).exec();
}
