const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('../dbconnect');
//const charaschema = require('./charas.model');
const btnschema = require('./btnc.model');

// user schema


const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  //listof_characters: [Schema.types.ObjectId]
  buttontest_id: [mongoose.Schema.Types.ObjectId]
});

const User = module.exports = mongoose.model('User', UserSchema);

// schema model functions -> {mongoose functions}
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username};
  User.findOne(query, callback);
};


module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash)=>{
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function(password, hash, callback) {
bcrypt.compare(password, hash, (err, isMatch) => {
  if(err) throw err;
  callback(null, isMatch);
});
};

/// TODO: actually use the character model and stuff, not the supersimple button
/// also: post, get, put, delete || ie:[create, read, update, delete]
// module.exports.UserAddCharacter = function(newCharacter, callback) {
//   charaschema.addCharacter(newCharacter, callback);
// };

module.exports.grabButton = function(buttonid, callback) {
  btnschema.getButton(buttonid, callback);
};