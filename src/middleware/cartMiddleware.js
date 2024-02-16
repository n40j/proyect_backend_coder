const Product = require('../dao/models/Product');

exports.checkProductOwnership = async (req, res, next) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (req.user.role === 'premium' && product.owner.toString() === req.user._id.toString()) {
        return res.status(403).json({ message: "No puedes agregar tu propio producto al carrito" });
    }

    next();
};
