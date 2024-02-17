const mongoose = require('mongoose');

// Definición del esquema para el modelo 'Cart'
const cartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    validate: {
      validator: async function(userId) {
        const user = await mongoose.model('User').findById(userId);
        return user !== null;
      },
      message: props => `${props.value} no es un usuario válido.`
    }
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
