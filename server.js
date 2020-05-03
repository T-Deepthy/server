const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(bodyParser.json())

// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db', { useNewUrlParser: true, useUnifiedTopology: true  , useCreateIndex: true , useFindAndModify: false }).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome"});
});

require('./app/routes/component.js')(app);
require('./app/routes/designation.js')(app);
require('./app/routes/employee.js')(app);

const port = process.env.PORT || 8080;
app.listen(port);