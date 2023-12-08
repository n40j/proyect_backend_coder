const express = require('express');
const router = express.Router();

// Lógica para manejar la solicitud GET a /register
router.get('/', (req, res) => {
  res.render('register'); // Renderiza la vista del formulario de registro
});

// Lógica para manejar la solicitud POST a /register
router.post('/', (req, res) => {
  // Aquí deberías procesar los datos del formulario de registro
  // Por ejemplo, obtener los datos del formulario y guardarlos en la base de datos

  // Redirige a alguna página después de procesar los datos
  res.redirect('/login'); // Redirige a la página de inicio de sesión
});

module.exports = router;
