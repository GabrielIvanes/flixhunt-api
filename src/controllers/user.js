const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserModel = require('../models/user');

const getUserInfo = (req, res) => {
	const id = req.params.id;
	UserModel.findOne({ _id: id })
		.then((user) => {
			if (user) {
				return res
					.status(200)
					.json({ username: user.username, image: user.image });
			} else {
				return res.status(404).json({ message: 'User not found' });
			}
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
};

const getId = (req, res) => {
	const token = req.cookies.accessToken;
	if (token) {
		jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
			if (err) {
				return res.status(400).json('token non valide');
			} else {
				console.log(decodedToken.userId);
				return res.status(200).json({ id: decodedToken.userId });
			}
		});
	} else {
		return res.status(404).json('No token found');
	}
};

module.exports = { getUserInfo, getId };
