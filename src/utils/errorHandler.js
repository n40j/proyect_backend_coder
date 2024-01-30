const errorDictionary = {
    PRODUCT_NOT_FOUND: 'Producto no encontrado',
    INVALID_PRODUCT_DATA: 'Datos del producto inválidos',
    
};

function createError(code, details) {
    const error = new Error(errorDictionary[code] || 'Error desconocido');
    error.code = code;
    error.details = details || null;
    return error;
}

module.exports = {
    createError,
    errorDictionary,
};