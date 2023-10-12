const mongoose = require('mongoose');

const customListSchema = new mongoose.Schema({
	userId: { type: String, required: true, ref: 'user' },
	listName: { type: String, required: true },
});

const moviesInCustomListSchema = new mongoose.Schema({
	listId: { type: Number, ref: 'customList' },
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
	dateAdded: { type: Date, default: Date.now, required: true },
	posterPath: { type: String },
	title: { type: String },
	genres: { type: String },
	directors: { type: String },
	backdropPath: { type: String },
	date: { type: String },
	elementNumber: { type: String },
});

const customList = mongoose.model('customList', customListSchema);
const movieInCustomList = mongoose.model(
	'elementInCustomList',
	moviesInCustomListSchema
);

module.exports = {
	customList,
	movieInCustomList,
};
