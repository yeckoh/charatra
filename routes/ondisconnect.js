module.exports = function(alltheids, socket) {
    
    alltheids.push(socket.id);
    
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
        var index = alltheids.indexOf(socket.id);
        alltheids.splice(index, 1);
    });
}
