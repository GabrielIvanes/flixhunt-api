const mongoose = require('mongoose');
require('dotenv').config();

mongoose
	.connect(
		`mongodb+srv://MongoDB:${process.env.MONGODB_PASSWORD}@cluster0.bztet3h.mongodb.net/?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log('Connected to MongoDB !'))
	.catch((err) => console.log(`Failed to connect to MongoDB ${err}`));
