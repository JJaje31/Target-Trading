const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/index');
const router = require('./routes/routes');
const app = express();
require('dotenv').config();
const port = 5000;





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));


db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use('/', router);


process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    db.close(); // Close MongoDB connection
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

// Start Express server
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});