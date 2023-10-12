const mongoose = require('mongoose');

const defaultListSchema = mongoose.Schema({
	userId: { type: String, required: true, ref: 'user' },
	listName: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				return (
					value === 'like' ||
					value === 'watchlist' ||
					value === 'theater' ||
					value === 'seen'
				);
			},
			message:
				'La valeur de listName doit être "like" ou "watchlist" ou "theater" ou "seen".',
		},
	},
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
			message:
				'La valeur de elementType doit être "movie" ou "tv" ou "episode" ou "season".',
		},
	},
	dateAdded: { type: Date, default: Date.now, required: true },
	posterPath: { type: String },
	title: { type: String },
	genres: {
		type: [
			{
				id: { type: String },
				name: { type: String },
			},
		],
	},
	directors: {
		type: [
			{
				id: { type: String },
				name: { type: String },
			},
		],
	},
	backdropPath: { type: String },
	date: { type: String },
	elementNumber: { type: String },
	elementParent: {
		parent: {
			type: [
				{
					name: { type: String },
					id: { type: String },
					number: { type: String },
				},
			],
			default: undefined,
		},
	},
});

module.exports = mongoose.model('defaultList', defaultListSchema);
