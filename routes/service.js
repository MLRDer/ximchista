const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
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
		const services = await Service.find().sort({ date: -1 });
		res.status(200).json(services);
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
		const servise = new Service({
			image: `uploads/${req.file.filename}`,
			uz: {
				title: req.body.uz.title,
				type: req.body.uz.type
			},
			ru: {
				title: req.body.ru.title,
				type: req.body.ru.type
			},
			price: req.body.price
		});

		const saved = await servise.save();
		res.status(200).json(saved);	
	}
	catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		});
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const update = await Service.findByIdAndUpdate(req.params.id,
			{
				$set: {
					uz: {
						title: req.body.uz.title,
						type: req.body.uz.type
					},
					ru: {
						title: req.body.ru.title,
						type: req.body.ru.type
					},
					price: req.body.price			
				}
			}, { new: true }
		);

		res.status(200).json(update);
	}
	catch (err) {
		res.status(400).json({
			success: false,
			message: err.message
		});		
	}
});

router.patch('/image/:id', upload.single('image'), async (req, res) => {
	try {
		const servise = await Service.findById(req.params.id);
		deleteFile(servise.image);
		servise.image = `uploads/${req.file.filename}`;
		const update = await servise.save();

		res.status(200).json(update);
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
		const servise = await Service.findById(req.params.id);
		deleteFile(servise.image);
		await servise.remove();

		res.status(200).json({
			success: true,
			message: "Xizmat muvaffaqiyatli o'chirildi!"
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