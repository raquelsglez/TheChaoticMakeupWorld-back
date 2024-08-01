const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userController');
const authMiddleware = require('../../middleware/authMiddleware')

router.get('/favorites', authMiddleware.requireToken, userController.getMyFavoritePosts);

module.exports = router;
