const Ticket = require('../dao/models/Ticket');
const ProductModel = require('../dao/models/Product'); // Agregado: Importar el modelo Product

class TicketService {
  async processPurchase(cartId, productsInCart, purchaserEmail) { // Agregado: Parámetro purchaserEmail
    // Lógica para procesar la compra y generar el ticket

    // Verificar stock y realizar la compra
    const productsNotPurchased = [];
    let totalAmount = 0;

    for (const productInfo of productsInCart) {
      const product = await ProductModel.findById(productInfo.productId);

      if (!product || product.stock < productInfo.quantity) {
        productsNotPurchased.push(productInfo.productId);
      } else {
        // Actualizar el stock del producto
        product.stock -= productInfo.quantity;
        await product.save();

        // Calcular el total de la compra
        totalAmount += product.price * productInfo.quantity;
      }
    }

    // Crear el ticket con la información de la compra
    const ticket = new Ticket({
      code: generateUniqueCode(),
      amount: totalAmount,
      purchaser: purchaserEmail, // Utilizando el email proporcionado
    });

    try {
      await ticket.save();

      // Filtrar los productos que no se pudieron comprar del carrito
      const productsPurchased = productsInCart.filter(productInfo =>
        !productsNotPurchased.includes(productInfo.productId)
      );

      return { ticket, productsNotPurchased, productsPurchased };
    } catch (error) {
      console.error(error);
      throw new Error('Error al procesar la compra y generar el ticket');
    }
  }
}

function generateUniqueCode() {
  // Lógica para generar un código único para el ticket
}

module.exports = TicketService;
