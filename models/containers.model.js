const mongoose = require('mongoose');
const Item = require('./items.model');

var ContainerSchema = mongoose.Schema({

    name: String,
    descript: String,
    listof_items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Items'}]
});


const Container = module.exports = mongoose.model('Containers', ContainerSchema);

// schema model functions -> {mongoose functions}

module.exports.MakeNewEquipmentContainer = function() {
  let newContainer = new Container({
    name: 'Equipped',
    descript: 'Worn or active items go here',
    listof_items: [Item.MakeNewItem(), Item.MakeNewItem()]
  })
  newContainer.save();
  return newContainer._id;
}

module.exports.MakeNewInventoryContainer = function() {
  let newContainer = new Container({
    name: 'Inventory',
    descript: 'Your inventory',
    listof_items: [Item.MakeNewItem(), Item.MakeNewItem()]
  })
  newContainer.save();
  return newContainer._id;
}

module.exports.MakeExtraContainer = function() {
  let newContainer = new Container({
    name: 'Other',
    descript: 'Maybe its a hideyhole',
    listof_items: [Item.MakeNewItem(), Item.MakeNewItem()]
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
