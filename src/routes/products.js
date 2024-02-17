const express = require('express');
const router = express.Router();
const ProductManagerMongo = require('../dao/ProductManagerMongo');
const { isAdmin } = require('../middleware/authorizationMiddleware');
const { canDeleteProduct } = require('../middleware/authMiddleware');

const productManagerMongo = new ProductManagerMongo();

// Rutas para la gestión de productos

router.get('/', async (req, res) => {
  try {
    // Lógica para obtener todos los productos
    const products = await productManagerMongo.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    // Lógica para obtener un producto por su ID
    const product = await productManagerMongo.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

router.post('/', isAdmin, async (req, res) => {
  try {
    const newProduct = req.body;
    // Lógica para agregar un nuevo producto
    const createdProduct = await productManagerMongo.createProduct(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ error: 'Datos de producto no válidos' });
  }
});

router.put('/:pid', isAdmin, async (req, res) => {
  const productId = req.params.pid;
  try {
    const updatedProductData = req.body;
    // Lógica para actualizar un producto por su ID
    const updatedProduct = await productManagerMongo.updateProduct(productId, updatedProductData);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Datos de producto no válidos' });
  }
});

router.delete('/:pid', isAdmin, canDeleteProduct, async (req, res) => {
  const productId = req.params.pid;
  try {
    // Lógica para eliminar un producto por su ID
    const result = await productManagerMongo.deleteProduct(productId);
    if (!result.deletedCount) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

module.exports = router;
