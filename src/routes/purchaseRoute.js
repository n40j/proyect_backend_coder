const express = require('express');
const router = express.Router();
const TicketService = require('../services/TicketService'); 
const ProductModel = require('../dao/models/Product'); 

router.post('/:cid/purchase', async (req, res) => {
  const cartId = req.params.cid;
  const productsInCart = req.body.products;

  // Lógica para verificar stock y procesar la compra
  const ticketService = new TicketService();

  try {
    const { ticket, productsNotPurchased, productsPurchased } = await ticketService.processPurchase(cartId, productsInCart);

    // Actualizar el carrito asociado al usuario
    
    // req.user.cart.products = productsNotPurchased;
    // await req.user.cart.save();

    res.json({
      ticketId: ticket._id,
      productsNotPurchased,
      productsPurchased,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la compra' });
  }
});

module.exports = router;
