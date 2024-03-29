const mongoose = require('mongoose');

// Definición del esquema para el modelo 'Product'
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Sin valor predeterminado
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
