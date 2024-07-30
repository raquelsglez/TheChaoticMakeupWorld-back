const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/postController');
const authMiddleware = require('../../middleware/adminAuthMiddleware')

router.post('/', authMiddleware.requireToken, adminController.createPost);
router.get('/', authMiddleware.requireToken, adminController.getPosts);
router.get('/:id', authMiddleware.requireToken, adminController.getPost);
router.put('/:id', authMiddleware.requireToken, adminController.updatePost);
router.delete('/:id', authMiddleware.requireToken, adminController.deletePost);

module.exports = router;
