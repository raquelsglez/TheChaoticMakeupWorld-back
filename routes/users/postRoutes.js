const express = require('express');
const router = express.Router();
const postController = require('../../controllers/users/postController');
const userController = require('../../controllers/users/userController');
const authMiddleware = require('../../middleware/authMiddleware')

router.get('/', postController.getPosts);
router.get('/:id', authMiddleware.verifyToken, postController.getPost);
router.post('/:id/favorites', authMiddleware.requireToken, userController.doFavorite);
router.post('/:id/unfavorites', authMiddleware.requireToken, userController.doUnfavorite);

module.exports = router;
