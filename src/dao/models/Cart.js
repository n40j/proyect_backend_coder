const mongoose = require('mongoose');

// Definición del esquema para el modelo 'Cart'
const cartSchema = new mongoose.Schema({
  user: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

