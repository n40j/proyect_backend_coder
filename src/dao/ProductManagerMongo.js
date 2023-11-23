const Product = require('../models/ProductModel'); // Importar el modelo de Mongoose para los productos

class ProductManagerMongo {
  async getAllProducts() {
    try {
      const products = await Product.find(); // Obtener todos los productos desde la base de datos
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }

  // Implementar métodos para crear, actualizar, eliminar un producto, etc.
  // Ejemplo:
  
  async addProduct(productData) {
    try {
      const newProduct = await Product.create(productData); // Crear un nuevo producto en la base de datos
      return newProduct;
    } catch (error) {
      throw new Error('Error al agregar un nuevo producto');
    }
  }

  // Otros métodos como updateProduct, deleteProduct, etc.
}

module.exports = ProductManagerMongo;