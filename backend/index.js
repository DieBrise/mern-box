const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/api');
const Todo = require('./models/todo');

require('dotenv').config();

const app = express();

app.use(cors());

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', async () => {});

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
	console.log(err);
	next();
});

module.exports = app;