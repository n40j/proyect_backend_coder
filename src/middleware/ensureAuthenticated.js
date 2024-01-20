const ensureAuthenticated = (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (req.isAuthenticated()) {
      // Si está autenticado, permitir el acceso y pasar al siguiente middleware o ruta
      return next();
    }
  
    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    res.redirect('/login');
  };
  
  module.exports = ensureAuthenticated;
  