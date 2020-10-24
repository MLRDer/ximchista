const mongoose = require('mongoose');
const { Schema } = mongoose;


const aboutSchema = new Schema({
	image: {
		type: String,
		required: true
	},
	uz: {
		title: {
			type: String,
			required: true
		},
		body: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		}
	},
	ru: {
		title: {
			type: String,
			required: true
		},
		body: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		}
	},
	email: {
		type: String,
		required: true
	},
	phone: [String],
	instagram: String,
	telegram: String,
	facebook: String
});


module.exports = mongoose.model('About', aboutSchema);