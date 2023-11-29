const mongoose = require('mongoose');

// Esquema para los productos
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  
});

// Modelo para los productos basado en el esquema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
