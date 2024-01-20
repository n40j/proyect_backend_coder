const Cart = require('../models/Cart'); 

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
      const cart = await Cart.findById(cartId).populate('products'); 
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

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      cart.products.pull(productId); // Elimina el productId del array de productos
      await cart.save();
    } catch (error) {
      throw new Error('Error al eliminar el producto del carrito');
    }
  }

  async updateCart(cartId, updatedProducts) {
    try {
      const cart = await Cart.findById(cartId);
      cart.products = updatedProducts; // Actualiza los productos del carrito con los nuevos productos
      await cart.save();
    } catch (error) {
      throw new Error('Error al actualizar el carrito');
    }
  }

  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await Cart.findById(cartId);
      const productIndex = cart.products.indexOf(productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = newQuantity; // Actualiza la cantidad del producto en el carrito
        await cart.save();
      }
    } catch (error) {
      throw new Error('Error al actualizar la cantidad del producto en el carrito');
    }
  }

  async deleteCart(cartId) {
    try {
      await Cart.findByIdAndDelete(cartId); // Elimina el carrito por su ID
    } catch (error) {
      throw new Error('Error al eliminar el carrito');
    }
  }

  async getCartWithProducts(cartId) {
    try {
      const cart = await Cart.findById(cartId).populate('products'); // Obtiene el carrito con detalles completos de los productos
      return cart;
    } catch (error) {
      throw new Error('Error al obtener los productos del carrito');
    }
  }
}

module.exports = CartManagerMongo;
