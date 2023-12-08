const express = require('express');
const router = express.Router();
const AuthManager = require('../utils/AuthManager');

// Ruta GET para mostrar el formulario de registro
router.get('/', (req, res) => {
  res.render('signup'); // Renderiza la vista del formulario de registro
});

// Ruta POST para manejar la lógica de registro
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    await AuthManager.registerUser(email, password);
    res.redirect('/login'); // Redireccionar al login después del registro exitoso
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
