module.exports = function(alltheids, socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'ondisconnect');
    socket.on('disconnect', () => {
        console.log(socket.id, "\x1b[2m\x1b[32m"+'disconnected'+"\x1b[0m");
        var index = alltheids.indexOf(socket.id);
        alltheids.splice(index, 1); // remove from list
    });
}
