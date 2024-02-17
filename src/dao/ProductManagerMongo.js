const Product = require('../models/Product');

class ProductManagerMongo {
  async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }

  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto por ID');
    }
  }

  async addProduct(productData) {
    try {
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error) {
      throw new Error('Error al agregar un nuevo producto');
    }
  }

  async updateProduct(productId, updatedProductData) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
      if (!updatedProduct) {
        throw new Error('Producto no encontrado para actualizar');
      }
      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        throw new Error('Producto no encontrado para eliminar');
      }
      return deletedProduct;
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}

module.exports = ProductManagerMongo;
