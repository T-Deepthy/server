const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
// create express app
const app = express();
const cors = require('cors');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
// parse application/json
app.use(bodyParser.json())

// Configuring the database
// const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/salary-slip-app').then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Eaze accounts"});
});

require('./app/routes/component.js')(app);
require('./app/routes/designation.js')(app);
require('./app/routes/employee.js')(app);


// // listen for requests
// app.listen(8080, () => {
//     console.log("Server is listening on port 8080");
// });
const port = process.env.PORT || 8080;
app.listen(port);