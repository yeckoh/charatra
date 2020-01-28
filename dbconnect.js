/// dbconnect.js defines the entrypoint for connecting to the database
const mongoose = require('mongoose');

// database location
const connection = 'mongodb://localhost:27017/CRUDbase';

// try connecting to the mongo database. log an error if we can't connect
var db = mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) console.log(err);
    else console.log('successful connection to ' + connection);
});

// for establishing db connections outside this file
module.exports = mongoose;
