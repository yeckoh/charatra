/// server.js defines the entrypoint for the webserver service
/*
express serves hooks and function calls for requests and responses
bodyparser parses incoming requests for the handlers
*/
const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./dbconnect.js');
const cors = require('cors');

// middleware EXPRESS
const port = 3000;
const app = express()
.use(bodyParser.json())
.use(cors({ origin: 'http://localhost:4200' }));



// import the controller so we can CRUD
var charaController = require('./controllers/charas.controller');


// ROUTES
// define localhost:3000/charas, charas.controller
app.use('/charas', charaController);


var btnController = require('./controllers/btnc.controller');
app.use('/btn', btnController);


// refs localhost:3000/api
var register = require('./controllers/user.controller');
app.use('/users', register);


// start server
app.listen(port, function(){
    console.log('listening on port 3000...');
});
