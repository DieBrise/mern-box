const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/api');
const Config = require('./config');

require('dotenv').config();

const app = express();

const { atlas, port } = Config;

app.use(cors());

mongoose.connect(atlas, { useNewUrlParser: true, useCreateIndex: true });

const { connection } = mongoose;
connection.once('open', async () => {});

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
	next();
});

module.exports = { app, port };
