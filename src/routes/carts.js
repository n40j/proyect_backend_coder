const express = require('express');
const router = express.Router();
const CartManagerMongo = require('../dao/CartManagerMongo');
const { checkProductOwnership } = require('../middleware/cartMiddleware');

// Crear una instancia del gestor de carritos con MongoDB
const cartManagerMongo = new CartManagerMongo();

// DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
router.delete('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    await cartManagerMongo.removeProductFromCart(cartId, productId);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});

// PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
router.put('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const updatedProducts = req.body.products;
  try {
    await cartManagerMongo.updateCart(cartId, updatedProducts);
    res.status(200).json({ message: 'Carrito actualizado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
});

// PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;
  try {
    await cartManagerMongo.updateProductQuantity(cartId, productId, quantity);
    res.status(200).json({ message: 'Cantidad de producto actualizada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
  }
});

// DELETE api/carts/:cid deberá eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    await cartManagerMongo.deleteCart(cartId);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar los productos del carrito' });
  }
});

// Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”
router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cartWithProducts = await cartManagerMongo.getCartWithProducts(cartId);
    res.json(cartWithProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
});

module.exports = router;
