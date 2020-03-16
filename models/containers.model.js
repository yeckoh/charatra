const mongoose = require('mongoose');
require('./items.model');

var ContainerSchema = mongoose.Schema({

    name: String,
    descript: String,
    listof_items: [mongoose.model('Items').schema]
});


const Container = module.exports = mongoose.model('Containers', ContainerSchema);

// schema model functions -> {mongoose functions}

module.exports.MakeNewEquipmentContainer = function() {
  let newContainer = new Container({
    name: 'Equipped',
    descript: 'Worn or active items go here',
    listof_items: []
  })
  // newContainer.save();
  return newContainer;
}

module.exports.MakeNewInventoryContainer = function() {
  let newContainer = new Container({
    name: 'Inventory',
    descript: 'Your inventory',
    listof_items: []
  })
  // newContainer.save();
  return newContainer;
}

module.exports.MakeExtraContainer = function() {
  let newContainer = new Container({
    name: 'Other',
    descript: 'Maybe its a hideyhole',
    listof_items: []
  })
  // newContainer.save();
  return newContainer;
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
