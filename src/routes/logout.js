const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  try {
    req.logout(); // Método para cerrar la sesión utilizando Passport
    req.session.destroy(); // Destruye la sesión en su totalidad
    res.clearCookie('connect.sid'); // Borra la cookie de sesión

    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
    res.status(500).json({ error: 'Error al cerrar la sesión' });
  }
});

module.exports = router;
