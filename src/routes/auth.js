const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../controllers/authController');

// Ruta para solicitar restablecimiento de contraseña
router.post('/forgot-password', forgotPassword);

// Ruta para mostrar el formulario de restablecimiento de contraseña
router.get('/reset-password/:token', resetPassword);

// Ruta para procesar el restablecimiento de contraseña
router.post('/reset-password/:token', resetPassword);

module.exports = router;
