const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
      next();
  } else {
      res.status(403).json({ error: 'Acceso no autorizado para administradores' });
  }
};

const isUser = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
      next();
  } else {
      res.status(403).json({ error: 'Acceso no autorizado para usuarios' });
  }
};

const isProductOwner = (req, res, next) => {
  const productId = req.params.productId;
  if (req.user && req.user.products.includes(productId)) {
      next();
  } else {
      res.status(403).json({ error: 'Acceso no autorizado para el propietario del producto' });
  }
};

module.exports = { isAdmin, isUser, isProductOwner };
