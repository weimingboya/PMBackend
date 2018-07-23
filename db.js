let mongoose = require('mongoose');
let config = require('./config');

mongoose.connect(`mongodb://localhost/${config.DB}`);
let db = mongoose.connection;

db.on('error',err=>{
    console.log(err.toString())
});
db.on('open',()=>{
    console.log('mongodb connect successfully!')
});
