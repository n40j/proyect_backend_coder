const express = require('express');
const router = express.Router();
const { isUser } = require('../middleware/authorizationMiddleware'); // Corregida la ruta del módulo
const UserRepository = require('../dao/models/User');

router.get('/current', isUser, async (req, res) => {
  try {
    // Lógica para obtener y enviar el DTO del usuario actual
    const userRepo = new UserRepository();
    const userDTO = await userRepo.getUserDTO(req.user.id);
    res.json(userDTO);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario actual' });
  }
});

module.exports = router;
