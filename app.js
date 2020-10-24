// all needed packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// routes
const loginRoute = require('./routes/login');
const aboutRoute = require('./routes/about');
const galleryRoute = require('./routes/gallery');


// database connection
const ConnectionString = process.env.ConnectionString;
mongoose.connect(
	ConnectionString, 
	{
		useUnifiedTopology: true, 
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true
	}
);


// all middleware functions
app.disable('x-powered-by');
app.use(bodyParser.json({
		limit: '50mb', extended: true 
	}));
app.use(bodyParser.urlencoded({
		limit: "50mb", extended: true, parameterLimit:50000
	}));



// listen
app.listen(4000);