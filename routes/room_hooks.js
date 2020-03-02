// this defines the join / leave hooks for users and characters
module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'room_hooks');

    // when 'joinUserRoom' gets fired...
    socket.on('joinUserRoom', function(sent_in_data) {
        // console.log('joining user room:' + sent_in_data);
        // data is a user_id
        socket.join(sent_in_data);
    });


    // when 'joinCharacterRoom' gets fired...
    socket.on('joinCharacterRoom', function(sent_in_data) {
        // data should be a character_id
        socket.join(sent_in_data);
        // socket.emit('testevent', sent_in_data); // send back to client who called
    });


}