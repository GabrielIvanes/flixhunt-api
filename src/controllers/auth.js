const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();
const emailValidator = require('deep-email-validator');

const maxAge = 3 * 24 * 60 * 60 * 1000;

async function isEmailValid(email) {
	return emailValidator.validate(email);
}

const signUp = async (req, res) => {
	const { username, email, password } = req.body;

	const { valid, reason, validators } = await isEmailValid(email);

	if (!valid) {
		return res.status(400).json({
			message: 'Please provide a valid email address.',
			reason: validators[reason].reason,
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	UserModel.init().then(async () => {
		const userModel = await new UserModel({
			email,
			username,
			password: hashedPassword,
			image: `${Math.floor(Math.random() * 15) + 1}.png`,
		});
		userModel
			.save()
			.then((user) => {
				return res.status(201).json({ user: user.id });
			})
			.catch((err) => {
				return res.status(400).json(err);
			});
	});
};

const signIn = async (req, res) => {
	if (req.body.email && req.body.password) {
		UserModel.findOne({ email: req.body.email })
			.then((user) => {
				bcrypt.compare(req.body.password, user.password).then((validate) => {
					if (validate) {
						const xsrfToken = crypto.randomBytes(64).toString('hex');
						const token = jwt.sign(
							{ userId: user._id, xsrfToken: xsrfToken },
							process.env.SECRET_TOKEN,
							{
								expiresIn: maxAge,
							}
						);
						res.cookie('accessToken', token, {
							httpOnly: true,
							maxAge,
							secure: true,
						});
						return res.json({
							success: true,
							user: user._id,
							xsrfToken: xsrfToken,
						});
					} else {
						return res
							.status(400)
							.json({ success: false, message: 'Invalid email or password' });
					}
				});
			})
			.catch((err) => {
				return res.status(400).json({
					success: false,
					message: 'No account with this email address.',
					err: err,
				});
			});
	} else {
		res
			.status(404)
			.json({ success: false, message: 'Missing the email or the password.' });
	}
};

const logout = (req, res) => {
	res.clearCookie('accessToken');
	res.end();
};

module.exports = { signIn, signUp, logout };
