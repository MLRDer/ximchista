const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		const type = file.originalname.split('.');
		cb(null, `${new Date().getTime()}.${ type[type.length - 1] }`);
	}
});

const fileFilter = (req, file, cb) => {
	// reject a file
	cb(null, file.mimetype.includes('image'));
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

function deleteFile(path) {
	fs.stat(path, function (err, stats) {
	   	if (err) {
	    	return console.error(err);
	   	}

	   	fs.unlink(path, function(err) {
	        if(err) {
	        	return console.log(err);
	   		}
	   	});  
	});
}


router.get('/', async (req, res) => {
	try {
		const data = await Gallery.find().sort({ date: -1 });
		res.status(200).json(data);
	}
	catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		});
	}
});

router.post('/', upload.single('image'), async (req, res) => {
	try {
		const gallery = new Gallery({
			image: `uploads/${req.file.filename}`
		});

		await gallery.save();
		res.status(200).json({
			success: true,
			message: "Muvaffaqiyatli yuklandi!"
		});
	}
	catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		});
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const gallery = await Gallery.findById(req.params.id);
		deleteFile(gallery.image);
		await gallery.remove();
		res.status(200).json({
			success: true,
			message: "Muvaffaqiyatli o'chirildi!"
		});
	}
	catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		});
	}
});


module.exports = router;