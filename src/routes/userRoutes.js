const router = require('express').Router();
const authControllers = require('../controllers/auth');
const userControllers = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/register', authControllers.signUp);
router.post('/login', authControllers.signIn);
router.get('/logout', authControllers.logout);
router.post('/:id', userControllers.getUserInfo);
router.get('/getId', userControllers.getId);

module.exports = router;
