const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const { changeUserRole } = require('../controllers/userController');

router.put('/premium/:uid', isAdmin, changeUserRole);

module.exports = router;
