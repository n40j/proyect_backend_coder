const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('login'); // Renderiza la vista del formulario de inicio de sesión
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/dashboard', // Redirige al panel de control después de iniciar sesión
  failureRedirect: '/login', // Redirige de vuelta a la página de inicio de sesión si falla la autenticación
  failureFlash: true // Activa mensajes flash para mostrar errores de autenticación
}));

router.get('/signup', (req, res) => {
  res.render('signup'); // Renderiza la vista del formulario de registro
});

module.exports = router;
