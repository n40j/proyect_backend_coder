const Cart = require('../models/Cart'); // Importar el modelo de carrito

class CartManagerMongo {
  async createCart() {
    try {
      const newCart = await Cart.create({ user: 'defaultUser', products: [] });
      return newCart;
    } catch (error) {
      throw new Error('Error al crear el carrito');
    }
  }

  async getProductsInCart(cartId) {
    try {
      const cart = await Cart.findById(cartId).populate('products'); // Utiliza populate si 'products' es una referencia a otros modelos
      return cart.products;
    } catch (error) {
      throw new Error('Error al obtener los productos del carrito');
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      cart.products.push(productId);
      await cart.save();
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito');
    }
  }

  // Otros métodos como removeProductFromCart, deleteCart, etc.
}

module.exports = CartManagerMongo;
