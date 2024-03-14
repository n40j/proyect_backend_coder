const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { isAdmin } = require('../middleware/authMiddleware');

// Endpoint para cambiar el rol de usuario a premium
router.put('/:uid/premium', isAdmin, UserController.updateToPremium);

module.exports = router;

