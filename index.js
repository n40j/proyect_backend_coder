class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        throw new Error("Todos los campos son obligatorios.");
      }
  
      if (this.products.some((p) => p.code === product.code)) {
        throw new Error("El campo 'code' ya está en uso.");
      }
  
      product.id = this.nextId++;
      this.products.push(product);
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
  }
  
  // Ejemplo de uso:
  const productManager = new ProductManager();
  
  try {
    productManager.addProduct({
      title: "Producto 1",
      description: "Descripción del Producto 1",
      price: 19.99,
      thumbnail: "imagen1.jpg",
      code: "P1",
      stock: 10,
    });
  
    productManager.addProduct({
      title: "Producto 2",
      description: "Descripción del Producto 2",
      price: 29.99,
      thumbnail: "imagen2.jpg",
      code: "P2",
      stock: 5,
    });
  
    console.log(productManager.getProducts());
  
    const productById = productManager.getProductById(1);
    console.log(productById);
  } catch (error) {
    console.error(error.message);
  }
  