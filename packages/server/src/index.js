require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const campaigns = require('./campaigns');

const app = express();
const port = 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/campaigns', campaigns);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
