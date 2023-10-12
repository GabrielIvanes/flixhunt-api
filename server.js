const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./src/db/mongoDB');
const userRoutes = require('./src/routes/userRoutes');
const TMDBRoutes = require('./src/routes/TMDBRoutes');
const actionsRoutes = require('./src/routes/actionsRoutes');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.env.port || 3000;

app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(
		cors({
			origin: ['http://localhost:3000', 'https://flixhunt.onrender.com'],
			credentials: true,
		})
	)
	.use(cookieParser());

app.get('/', (req, res) => {
	res.json('Hello server 🙌');
});

app.use('/api/user', userRoutes);
app.use('/api/TMDB', TMDBRoutes);
app.use('/api/actions', actionsRoutes);

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}/`);
});
