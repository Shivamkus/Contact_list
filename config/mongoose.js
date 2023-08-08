// connect to the library
const mongoose = require('mongoose');

//connect to the database

mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db');

//aqure the connection to check
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connected to db'));

db.once('open' , function(){
    console.log('connected sucessfully to database');
});