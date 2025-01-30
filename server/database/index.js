const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri = process.env.MONGO_URI;

mongoose
.connect(mongoUri,
)
.catch(e => {
    console.error(`connection error :` + e.message)
})

const db = mongoose.connection;

module.exports = db;