const express = require('express');
const router = express.Router();
const postController = require('../../controllers/users/postController');
const favoriteController = require('../../controllers/users/favoriteController');

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/:id/favorites/:id_users', favoriteController.doFavorite);
router.post('/:id/unfavorites/:id_users', favoriteController.doUnfavorite);

module.exports = router;
