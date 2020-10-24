const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');


router.post('/', async (req, res) => {
	try {
		const admin = await Admin.find({ login: req.body.login });

		if(admin) {
			if(admin.password === req.body.password) {
				return res.status(200).json({
					success: true,
					message: "Tasdiqlandi!"
				});
			}
		}

		res.status(400).json({
			success: false,
			message: "Xatolik yuz berdi"
		});
	}
	catch (err) {
		res.status(400).json({
			success: true,
			message: err.message
		});
	}
});


module.exports = router;