const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()
const https = require('https')
const userRoutes = require('./routes/user-routes');
const bodyParser = require('body-parser');
const private = require('./routes/private');
const mongoose = require('./db/mongoose');


const certOptions = {
    key: fs.readFileSync(path.resolve('./Keys/server.key')),
    cert: fs.readFileSync(path.resolve('./Keys/server.crt'))
}

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/private', private);

app.get('/', function (req, res) {
    res.send('hello world')
})
const PORT = 443;

var server = https.createServer(certOptions, app).listen(PORT, () => {
    console.log(`Server started on ${PORT}! Go to https://localhost:${PORT}/`);
})