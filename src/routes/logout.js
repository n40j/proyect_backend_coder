const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar la sesión:', err);
        res.status(500).json({ error: 'Error al cerrar la sesión' });
      } else {
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
      }
    });
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
    res.status(500).json({ error: 'Error al cerrar la sesión' });
  }
});

module.exports = router;

