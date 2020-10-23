// all needed packages
const express = require('express');
const app = express();
/* const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// routes


// patched mongoose
require('./helpers/customFuncs');

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


*/
app.get('/', (req, res) => {
	res.send('hello world');
});

// listen
app.listen(4000);