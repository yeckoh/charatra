const mongoose = require('mongoose');

var AttackSchema = mongoose.Schema({
    selected_color: String,
    is_active: Boolean,

    name: String,
    details: String,
    atkbonus: String,
    damage: String,

    parentFeature: mongoose.Schema.Types.ObjectId,
    parentItem: mongoose.Schema.Types.ObjectId,
    parentSpell: mongoose.Schema.Types.ObjectId
    
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
        name: 'Longsword',
        details: 'Versatile (1d10)',
        atkbonus: '{strMod+profBonus}',
        damage: '1d8 + {strMod} slashing'
    });
    newatk.save();
    return newatk._id;
}

module.exports.DeleteCascading = function(atkids) {
    Attack.deleteMany({_id: atkids}).exec();
}