/// server.js defines the entrypoint for the webserver service
/*
express serves hooks and function calls for requests and responses
bodyparser parses incoming requests for the handlers
*/
const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./dbconnect.js');
const port = 3000;
const app = express()
.use(bodyParser.json());


// import the controller so we can CRUD
var charaController = require('./controllers/charas.controller');

// define localhost:3000/charas, chara.controller
app.use('/charas', charaController);







// start server
app.listen(port, function(){
    console.log('listening on port 3000...');
});
