const express = require('express');
const router = express.Router();
const postController = require('../../controllers/users/postController');
const favoriteController = require('../../controllers/users/favoriteController');
const authMiddleware = require('../../middleware/authMiddleware')

router.get('/', postController.getPosts);
router.get('/:id', authMiddleware.verifyToken, postController.getPost);
router.post('/:id/favorites', authMiddleware.requireToken, favoriteController.doFavorite);
router.post('/:id/unfavorites', authMiddleware.requireToken, favoriteController.doUnfavorite);

module.exports = router;
