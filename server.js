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
  console.log('Connected to database '+dbconnect.database);
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

// EXPRESS ROUTES
const users = require('./routes/users');
app.use('/users', users);


// passport middleware for JWT
app.use(passport.initialize())
.use(passport.session());
require('./controllers/passport')(passport);



// set index.html folder for localhost:3000
app.use(express.static(path.join(__dirname, 'frontend/src')));


// start server
app.listen(port, function(){
    console.log('server started on port ' + port + '...');
});
