const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// user schema


const userSchema = mongoose.Schema ({
  username:{
    type: String,
    required: true
  },

  email:{
    type: String,
    required: true
  },

  password:{
    type: String,
    required: true
  },


});

const User = module.exports = mongoose.model('User', userSchema);


module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
};


module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash)=>{
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
