const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserModel = require('../models/user');

const getUserInfo = (req, res) => {
	const id = req.params.id;
	UserModel.findOne({ _id: id })
		.then((user) => {
			if (user) {
				res.status(200).json({ username: user.username, image: user.image });
			} else {
				res.status(404).json({ message: 'User not found' });
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
};

const getId = (req, res, next) => {
	const token = req.cookies.accessToken;
	if (token) {
		jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
			if (err) {
				res.status(400).json('token non valide');
			} else {
				console.log(decodedToken.userId);
				res.status(200).json({ id: decodedToken.userId });
				next();
			}
		});
	} else {
		res.status(404).json('No token found');
	}
};

module.exports = { getUserInfo, getId };
