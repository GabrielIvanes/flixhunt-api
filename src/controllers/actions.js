const commentModel = require('../models/comment');
const {
	customListModel,
	movieInCustomListModel,
} = require('../models/customList');
const defaultListModel = require('../models/defaultList');

const defaultActions = async (req, res) => {
	const {
		userId,
		elementId,
		list,
		elementType,
		action,
		title,
		posterPath,
		directors,
		genres,
		backdropPath,
		date,
		elementNumber,
		elementParent,
	} = req.body;
	if (userId && elementId && list && elementType) {
		if (action === 'add') {
			const defaultActionsElement = await new defaultListModel({
				userId,
				listName: list,
				elementId,
				elementType,
				title,
				posterPath,
				directors,
				genres,
				backdropPath,
				date,
				elementNumber,
				elementParent,
			});
			defaultActionsElement
				.save()
				.then(() => {
					return res.status(200).json({
						success: true,
						message: 'element have been add with success',
					});
				})
				.catch((err) => {
					return res.status(400).json({ success: false, message: err });
				});
		} else {
			defaultListModel
				.findOneAndDelete({
					userId: userId,
					listName: list,
					elementId: elementId,
					elementType: elementType,
				})
				.then(() => {
					return res
						.status(200)
						.json({ success: true, message: 'Element has been removed.' });
				})
				.catch((err) => {
					return res
						.status(400)
						.json({ success: false, message: 'Element has not been removed' });
				});
		}
	} else {
		return res.status(500).json({ message: 'One element is missing.' });
	}
};

const getElementDefaultLists = async (req, res) => {
	const { userId, elementId, elementType } = req.body;

	if (elementId && userId && elementType) {
		defaultListModel
			.find({ userId: userId, elementId: elementId, elementType: elementType })
			.then((elementLists) => {
				if (elementLists) {
					return res
						.status(200)
						.json({ success: true, elementLists: elementLists });
				} else {
					return res
						.status(404)
						.json({ success: false, message: 'Element has no list.' });
				}
			})
			.catch((err) => {
				return res.status(400).json({ success: false, message: err });
			});
	} else {
		return res.status(400).json({
			success: false,
			message:
				'Missing the element id or the user id or the type of the element.',
		});
	}
};

const getUserCustomLists = async (req, res) => {
	const userId = req.body.userId;

	if (userId) {
		const customLists = await customListModel.find({ userId });
		if (customLists) {
			return res.status(200).json({ customLists: customLists });
		} else {
			return res.status(404).json({ message: 'User got no custom list.' });
		}
	} else {
		return res.status(400).json({ message: 'Missing the user id.' });
	}
};

const getElementComment = async (req, res) => {
	const { userId, elementId, elementType } = req.body;

	if (userId && elementId && elementType) {
		const comment = await commentModel.find({ userId, elementId, elementType });
		if (comment) {
			return res.status(200).json({ comment: comment });
		} else {
			return res.status(400).json({ message: 'No comment for this element.' });
		}
	} else {
		return res
			.status(400)
			.json({ message: 'Missing the user id or the element id' });
	}
};

const addComment = async (req, res) => {
	const { userId, comment, elementId, elementType } = req.body;
	if (userId && elementId && elementType) {
		const isCommentAlreadyInDb = await commentModel.find({
			userId: userId,
			elementId: elementId,
			elementType: elementType,
		});
		if (isCommentAlreadyInDb.length > 0) {
			commentModel
				.findOneAndUpdate(
					{ userId: userId, elementId: elementId, elementType: elementType },
					{ comment: comment }
				)
				.then(() => {
					return res
						.status(200)
						.json({ success: true, message: 'comment has been updated' });
				})
				.catch((err) => {
					return res.status(400).json({
						success: false,
						message: `comment has not been updated: ${err}`,
					});
				});
		} else {
			const commentElement = await new commentModel({
				userId,
				comment,
				elementId,
				elementType,
			});
			commentElement
				.save()
				.then(() => {
					return res.status(200).json({
						success: true,
						message: 'Comment have been add with success',
					});
				})
				.catch((err) => {
					return res.status(400).json({ success: false, message: err });
				});
		}
	} else {
		return res.status(400).json({
			message: 'Missing the user id or the element id or the comment',
		});
	}
};

const getUserElements = async (req, res) => {
	const userId = req.body.userId;
	if (userId) {
		defaultListModel
			.find({ userId })
			.then((elements) => {
				return res.status(200).json({ elements: elements });
			})
			.catch((err) => {
				return res.status(400).json({ message: 'No element for the user.' });
			});
	} else {
		return res.status(400).json({ message: 'Missing the userId.' });
	}
};

module.exports = {
	defaultActions,
	getElementDefaultLists,
	getUserCustomLists,
	getElementComment,
	addComment,
	getUserElements,
};
