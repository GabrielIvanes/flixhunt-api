const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	userId: { type: String, required: true, ref: 'user' },
	comment: { type: String, required: true },
	elementId: { type: String, required: true },
	elementType: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				return (
					value === 'movie' ||
					value === 'tv' ||
					value === 'episode' ||
					value === 'season'
				);
			},
		},
	},
	dateAdded: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model('comment', commentSchema);
