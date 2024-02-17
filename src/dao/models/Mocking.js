function generateMockProducts() {
    const mockProducts = [];
    for (let i = 1; i <= 100; i++) {
        mockProducts.push({
            _id: `mockProductId${i}`,
            name: `Mock Product ${i}`,
            price: parseFloat((Math.random() * 1000).toFixed(2)), // Generar un precio entre 0 y 1000 con dos decimales
        });
    }
    return mockProducts;
}

module.exports = {
    generateMockProducts,
};
