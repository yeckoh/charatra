/// server.js defines the entrypoint for the webserver service
/*
express serves hooks and function calls for requests and responses
bodyparser parses incoming requests for the handlers
*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const dbconnect = require('./dbconnect.js');


// connect to db
mongoose.connect(dbconnect.database, {useNewUrlParser:true, useUnifiedTopology: true});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+ "\x1b[36m"+ dbconnect.database + "\x1b[0m");
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

// middleware EXPRESS
const port = 3000;
const app = express()
.use(bodyParser.json())
.use(cors({ origin: 'http://localhost:4200' }));

// socketstuff
// socket io, pass in instance of a http server
const http = require('http');
const server = http.Server(app);
const wsocket = require('socket.io')(server);
app.set('socketio', wsocket);

// EXPRESS ROUTES
const users = require('./routes/users');
app.use('/users', users);

// passport middleware for JWT
app.use(passport.initialize())
.use(passport.session());
require('./controllers/passport')(passport);



// try to set index.html folder for localhost:3000
app.use(express.static(path.join(__dirname, 'frontend/src')));


// start server
// app.listen(port, function(){
//     console.log('server started on port ' + port + '...');
// });



// capture whenever someone connects to server
// defines ALL the hooks
// .emit (event name, what to send when the emit is called)
let socket_ids = [];
wsocket.on('connection', function(socket) {
  socket_ids.push(socket.id);

  require('./routes/room_hooks')(socket);
  require('./routes/ondisconnect')(socket_ids, socket);
  require('./routes/character_hooks')(socket);
  require('./routes/container_hooks')(socket);
  require('./routes/item_hooks')(socket);
  require('./routes/class_hooks')(socket);
  // require('./routes/spelllist_hooks')(socket);
  // require('./routes/spell_hooks')(socket);
  require('./routes/feature_hooks')(socket);
  require('./routes/attack_hooks')(socket);
  // require('./routes/effect_hooks')(socket);
  // require('./routes/savingthrow_hooks')(socket);
  console.log('list of all socketids:');
  console.log(socket_ids);
  console.log('\n');
  
  return socket;
});








server.listen(3000, function() {
  console.log('WSocket server started on port ' +"\x1b[36m"+ port + '...' +"\x1b[0m");
});
