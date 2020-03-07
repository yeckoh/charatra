// this defines the join / leave hooks for users and characters
module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'room_hooks');

    // when 'Join_user_room' gets fired...
    socket.on('Join_user_room', function(sent_in_data) {
        // data is a user_id
        socket.join(sent_in_data);
    });


    // when 'Join_character_room' gets fired...
    socket.on('Join_character_room', function(sent_in_data) {
        // data should be a character_id
        socket.join(sent_in_data);
    });

    socket.on('Leave_character_room', function(sent_in_data) {
        socket.leave(sent_in_data);
    });

}