const Product = require('../dao/models/Product');

exports.checkProductOwnership = async (req, res, next) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        if (req.user.role === 'premium' && product.owner.toString() === req.user._id.toString()) {
            return res.status(403).json({ message: "No puedes agregar tu propio producto al carrito" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al verificar la propiedad del producto para el carrito" });
    }
};
