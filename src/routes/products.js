const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager');
const productManager = new ProductManager('data/productos.json');

// Inicializa Socket.io en este archivo
const io = require('socket.io')();

router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    // Agrega el nuevo producto a la lista de productos
    await productManager.addProduct(newProduct);

    // Emitir un evento de Socket.io para notificar la adición del producto en tiempo real
    io.emit('productAdded', newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Datos de producto no válidos' });
  }
});

router.put('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const updatedProductData = req.body;
    // Actualiza el producto por su ID
    await productManager.updateProduct(productId, updatedProductData);

    // Emitir un evento de Socket.io para notificar la actualización del producto en tiempo real
    io.emit('productUpdated', { id: productId, data: updatedProductData });

    res.status(200).json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(400).json({ error: 'Datos de producto no válidos' });
  }
});

router.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    // Elimina el producto por su ID
    await productManager.deleteProduct(productId);

    // Emitir un evento de Socket.io para notificar la eliminación del producto en tiempo real
    io.emit('productDeleted', productId);

    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = { router, io }; // Exporta el router y la instancia de Socket.io

