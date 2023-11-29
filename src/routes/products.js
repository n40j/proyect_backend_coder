const express = require('express');
const router = express.Router();
const ProductManagerMongo = require('../dao/ProductManagerMongo'); // Importar el nuevo manager para productos con MongoDB

// Crear una instancia del gestor de productos con MongoDB
const productManagerMongo = new ProductManagerMongo();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const options = {
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      sort: sort === 'desc' ? { price: -1 } : sort === 'asc' ? { price: 1 } : null,
    };

    const filter = query ? { category: query } : {};

    const products = await productManagerMongo.getAllProducts(filter, options);
    const totalProducts = await productManagerMongo.getTotalProducts(filter);

    const totalPages = Math.ceil(totalProducts / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const prevPage = hasPrevPage ? parseInt(page) - 1 : null;
    const nextPage = hasNextPage ? parseInt(page) + 1 : null;

    const prevLink = hasPrevPage ? `/products?page=${prevPage}&limit=${limit}` : null;
    const nextLink = hasNextPage ? `/products?page=${nextPage}&limit=${limit}` : null;

    const result = {
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: parseInt(page),
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    // Obtener un producto por su ID desde MongoDB
    const product = await productManagerMongo.getProductById(productId); // Método correspondiente del manager
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    // Agregar un nuevo producto a MongoDB
    const createdProduct = await productManagerMongo.createProduct(newProduct); // Método correspondiente del manager

    // Emitir un evento de Socket.io para notificar la adición del producto en tiempo real (si es necesario)
    // Aquí deberías gestionar la lógica de Socket.io si lo estás utilizando

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ error: 'Datos de producto no válidos' });
  }
});

router.put('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const updatedProductData = req.body;
    // Actualizar un producto por su ID en MongoDB
    const updatedProduct = await productManagerMongo.updateProduct(productId, updatedProductData); // Método correspondiente del manager

    // Emitir un evento de Socket.io para notificar la actualización del producto en tiempo real (si es necesario)
    // Aquí deberías gestionar la lógica de Socket.io si lo estás utilizando

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Datos de producto no válidos' });
  }
});

router.delete('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    // Eliminar un producto por su ID en MongoDB
    await productManagerMongo.deleteProduct(productId); // Método correspondiente del manager

    // Emitir un evento de Socket.io para notificar la eliminación del producto en tiempo real (si es necesario)
    // Aquí deberías gestionar la lógica de Socket.io si lo estás utilizando

    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
