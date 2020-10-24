const mongoose = require('mongoose');
const { Schema } = mongoose;

const gallerySchema = new Schema({
	image: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});


module.exports = mongoose.model('Gallery', gallerySchema);