const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/authController');

router.post('/register', authController.createUser);
router.post('/login', authController.getUser);

module.exports = router;
