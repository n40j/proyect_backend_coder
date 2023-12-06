const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthManager {
  async registerUser(email, password) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('El usuario ya existe');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error('Error al registrar al usuario');
    }
  }

  async loginUser(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Credenciales inválidas');
      }

      const token = jwt.sign({ userId: user._id }, 'tu_secreto_secreto', { expiresIn: '1h' });

      return token;
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, 'tu_secreto_secreto');
      const userId = decoded.userId;

      const user = await User.findById(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  async authenticateUser(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error('Acceso no autorizado. Token no proporcionado');
      }

      const decoded = jwt.verify(token, 'tu_secreto_secreto');
      const userId = decoded.userId;

      // Ejemplo: Comprobar si el usuario existe en la base de datos
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Ejemplo: Puedes almacenar el usuario en el objeto de solicitud (req) para su uso posterior
      req.user = user;

      next();
    } catch (error) {
      res.status(401).json({ error: 'Acceso no autorizado' });
    }
  }
}

module.exports = new AuthManager();
