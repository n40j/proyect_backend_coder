const ensureAuthenticated = (req, res, next) => {
  // Verificar si el usuario está autenticado
  if (req.isAuthenticated()) {
      // Si está autenticado, permitir el acceso y pasar al siguiente middleware o ruta
      return next();
  }

  // Si el usuario no está autenticado, responder con un error de no autorizado
  return res.status(401).json({ error: 'Acceso no autorizado' });
};

module.exports = ensureAuthenticated;
