const express = require('express');
const router = express.Router();
const AuthManager = require('../utils/AuthManager');

router.get('/', (req, res) => {
  // Renderizar la vista para iniciar sesión
  res.render('login'); // Asegúrate de tener esta vista configurada
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await AuthManager.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/signup', (req, res) => {
  // Renderizar la vista para registrarse
  res.render('signup'); // Asegúrate de tener esta vista configurada
});

// Agregar lógica para registrar un usuario
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    await AuthManager.registerUser(email, password);
    res.redirect('/login'); // Redireccionar al login después del registro exitoso
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

