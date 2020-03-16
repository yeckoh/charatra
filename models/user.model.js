const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

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
  listof_characters: [mongoose.Schema.Types.ObjectId]
});

const User = module.exports = mongoose.model('User', UserSchema);

//=========================================================================
// stuff for passport
//=========================================================================

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



//=========================================================================
// stuff for socket hooks
//=========================================================================


module.exports.AddToListofbyid = function(id, charaid) {
  console.log('adding charaid to userlist');
  User.findByIdAndUpdate(id, {$push: {listof_characters: [charaid] }}).exec(); //equivalent
  //User.findOneAndUpdate(id, {$push: { listof_characters: [charaid] }}).exec();
}
