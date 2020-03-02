// const buttonmodel = require('../models/btnc.model');

// emitters can be separated into their own files
// just append require(filepath) to server.js
// pass in socket from server.js
module.exports = function(socket) {
    console.log('socktester loaded');

    // when 'testevent' gets fired...
    socket.on('testevent', function(sent_in_data) {

        // we can perform regular CRUD ops on our models using mongoose
        // let newbtn = new buttonmodel({ presses: 123, other_presses: 456});
        // newbtn.save();
        
        socket.emit('testevent', sent_in_data); // send back to client who called
        socket.broadcast.emit('testevent', sent_in_data); // send to everyone but the caller
    });
}