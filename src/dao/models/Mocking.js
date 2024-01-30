function generateMockProducts() {
    const mockProducts = [];
    for (let i = 1; i <= 100; i++) {
        mockProducts.push({
            _id: `mockProductId${i}`,
            name: `Mock Product ${i}`,
            price: Math.floor(Math.random() * 100) + 1,
            
        });
    }
    return mockProducts;
}

module.exports = {
    generateMockProducts,
};