module.exports = function(alltheids, socket) {
    console.log('ws-loaded: ondisconnect')
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
        var index = alltheids.indexOf(socket.id);
        alltheids.splice(index, 1); // remove from list
    });
}
