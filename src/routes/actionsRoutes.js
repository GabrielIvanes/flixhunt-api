const router = require('express').Router();
const auth = require('../middleware/auth');
const actionsControllers = require('../controllers/actions');

router.post('/defaultAction', auth, actionsControllers.defaultActions);
router.post(
	'/getElementDefaultLists',
	auth,
	actionsControllers.getElementDefaultLists
);
router.post('/getUserCustomLists', auth, actionsControllers.getUserCustomLists);
router.post('/getElementComment', auth, actionsControllers.getElementComment);
router.post('/addComment', auth, actionsControllers.addComment);
router.post('/getUserElements', auth, actionsControllers.getUserElements);

module.exports = router;
