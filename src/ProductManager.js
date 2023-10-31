const fs = require('fs');

class ProductManager {
  constructor(path, onProductUpdate) {
    this.path = path;
    this.products = this.loadProducts();
    this.onProductUpdate = onProductUpdate;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    // Llamar al callback de actualización en tiempo real
    this.onProductUpdate(this.products);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  addProduct(product) {
    // Agregar el producto y luego guardar los cambios
    this.products.push(product);
    this.saveProducts();
  }

  updateProduct(id, updatedProductData) {
    // Actualizar el producto por su ID y luego guardar los cambios
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedProductData };
      this.saveProducts();
    }
  }

  deleteProduct(id) {
    // Eliminar el producto por su ID y luego guardar los cambios
    this.products = this.products.filter((p) => p.id !== id);
    this.saveProducts();
  }
}

module.exports = ProductManager;

