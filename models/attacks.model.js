const mongoose = require('mongoose');

var AttackSchema = mongoose.Schema({
    selected_color: String,
    is_active: Boolean,

    name: String,
    details: String,
    atkbonus: String,
    damage: String
});


const Attack = module.exports = mongoose.model('Attacks', AttackSchema);

// schema model functions -> {mongoose functions}

module.exports.SaveAttack = function(attackobj) {
    attackobj.save();
}

module.exports.GetAllAttacks = function(allids) {
    var query = Attack.find().where('_id').in(allids).exec();
    return query;
}

// for nested testing only atm
module.exports.MakeNewAttack = function() {
    let newatk = new Attack ({
        name: 'getrekt',
        details: 'nodetailshere'
    });
    newatk.save();
    return newatk._id;
}

module.exports.DeleteCascading = function(atkids) {
    Attack.deleteMany({_id: atkids}).exec();
}