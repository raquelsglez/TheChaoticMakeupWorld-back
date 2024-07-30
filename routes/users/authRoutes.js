const express = require('express');
const router = express.Router();
const authController = require('../../controllers/users/authController');

router.post('/register', authController.createUser);
router.post('/login', authController.getUser);

module.exports = router;
