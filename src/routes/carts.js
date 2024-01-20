const express = require('express');
const router = express.Router();
const CartManagerMongo = require('../dao/CartManagerMongo'); 

// Crear una instancia del gestor de carritos con MongoDB
const cartManagerMongo = new CartManagerMongo();

// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
router.delete('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    // Lógica para eliminar un producto del carrito en MongoDB
    await cartManagerMongo.removeProductFromCart(cartId, productId); // Utiliza el método correspondiente del manager
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});

// PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
router.put('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const updatedProducts = req.body.products; // Se espera un arreglo de productos para actualizar en el carrito
  try {
    // Lógica para actualizar los productos del carrito en MongoDB
    await cartManagerMongo.updateCart(cartId, updatedProducts); // Utiliza el método correspondiente del manager
    res.status(200).json({ message: 'Carrito actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
});

// PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;
  try {
    // Lógica para actualizar la cantidad de un producto en el carrito en MongoDB
    await cartManagerMongo.updateProductQuantity(cartId, productId, quantity); // Utiliza el método correspondiente del manager
    res.status(200).json({ message: 'Cantidad de producto actualizada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
  }
});

// DELETE api/carts/:cid deberá eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    // Lógica para eliminar todos los productos del carrito en MongoDB
    await cartManagerMongo.deleteCart(cartId); // Utiliza el método correspondiente del manager
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar los productos del carrito' });
  }
});

// Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”
router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    // Lógica para obtener todos los productos del carrito con detalles completos mediante populate en MongoDB
    const cartWithProducts = await cartManagerMongo.getCartWithProducts(cartId); // Utiliza el método correspondiente del manager
    res.json(cartWithProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
});

module.exports = router;