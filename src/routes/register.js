const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Asegúrate de importar el modelo de usuario
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('register'); // Renderiza la vista del formulario de registro
});

router.post('/', async (req, res) => {
  const { email, password, first_name, last_name, age } = req.body;

  try {
    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hash de la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({ email, password: hashedPassword, first_name, last_name, age });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    // Redirige a alguna página después del registro exitoso
    res.redirect('/login'); // Redirige a la página de inicio de sesión después del registro exitoso
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

module.exports = router;

