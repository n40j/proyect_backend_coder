const express = require('express');
const mockingModule = require('../dao/models/Mocking');

const router = express.Router();

// Ruta para obtener productos de Mocking
router.get('/mockingproducts', (req, res) => {
    const mockProducts = mockingModule.generateMockProducts();
    res.json(mockProducts);
});

module.exports = router;