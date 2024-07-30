const express = require('express');
const router = express.Router();
const authController = require('../../controllers/admin/authController');

router.post('/register', authController.createAdmin);
router.post('/login', authController.getAdmin);

module.exports = router;
