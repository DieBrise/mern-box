const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/api');
const path = require('path');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

// app.use((req, res, next) => {
// 	res.send("I too like woman!");
// });

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
	console.log(err);
	next();
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});