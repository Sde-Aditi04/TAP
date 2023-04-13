const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

// Update user profile
router.put('/', authMiddleware.verifyToken, profileController.updateProfile);

module.exports = router;
