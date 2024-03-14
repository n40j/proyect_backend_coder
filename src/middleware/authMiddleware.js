const Product = require('../dao/models/Product');

exports.canDeleteProduct = async (req, res, next) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        if (req.user.role === 'premium' && product.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "No tienes permiso para borrar este producto" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al verificar la autorización para eliminar el producto" });
    }
};

exports.isAdmin = (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "No estás autenticado" });
    }
  
    // Verificar el rol del usuario
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "No tienes permisos de administrador" });
    }
  
    // Si el usuario es un administrador, llamar a next() para continuar con la ejecución
    next();
  };
  