const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
	try {
		const { cookies, headers } = req;

		if (!cookies || !cookies.accessToken) {
			return res.status(401).json({ message: 'Missing token in cookie' });
		}

		const accessToken = cookies.accessToken;

		if (!headers || !headers['x-xsrf-token']) {
			return res.status(401).json({ message: 'Missing XSRF token in headers' });
		}

		const xsrfToken = headers['x-xsrf-token'];

		const decodedToken = jwt.verify(accessToken, process.env.SECRET_TOKEN);

		if (xsrfToken !== decodedToken.xsrfToken) {
			return res.status(401).json({ message: 'Bad xsrf token' });
		}

		const userId = decodedToken.userId;
		req.auth = {
			userId: userId,
		};
		return next();
	} catch (error) {
		return res.status(401).json({ error });
	}
};
