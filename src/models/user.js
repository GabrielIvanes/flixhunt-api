const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true, index: true },
	username: { type: String, required: true, index: false, unique: false },
	password: { type: String, required: true },
	image: { type: String, required: true },
	createAt: { type: Date, default: Date.now, required: true },
});
userSchema.plugin(uniqueValidator, {
	message: 'Error, expected {PATH} to be unique.',
});

module.exports = mongoose.model('user', userSchema);
