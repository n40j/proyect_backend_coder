const express = require('express');
const router = express.Router();
const CartManagerMongo = require('../dao/CartManagerMongo'); // Importar el nuevo manager para carritos con MongoDB

// Crear una instancia del gestor de carritos con MongoDB
const cartManagerMongo = new CartManagerMongo();

router.post('/', async (req, res) => {
  try {
    // Lógica para crear un nuevo carrito en MongoDB
    const newCart = await cartManagerMongo.createCart(); // Utiliza el método correspondiente del manager
    res.status(201).json({ message: 'Carrito creado con éxito', cartId: newCart._id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    // Lógica para obtener los productos de un carrito por su ID desde MongoDB
    const products = await cartManagerMongo.getProductsInCart(cartId); // Utiliza el método correspondiente del manager
    res.json({ cartId, products });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    // Lógica para agregar un producto a un carrito en MongoDB
    await cartManagerMongo.addProductToCart(cartId, productId); // Utiliza el método correspondiente del manager
    res.status(201).json({ message: 'Producto agregado al carrito con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

module.exports = router;

