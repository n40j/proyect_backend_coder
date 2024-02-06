const express = require('express');
const router = express.Router();

// Definir el endpoint para probar los logs
router.get('/loggerTest', (req, res) => {
    req.logger.debug('Este es un mensaje de debug');
    req.logger.http('Este es un mensaje HTTP');
    req.logger.info('Este es un mensaje de información');
    req.logger.warning('Este es un mensaje de advertencia');
    req.logger.error('Este es un mensaje de error');
    req.logger.fatal('Este es un mensaje fatal');

    // Mensaje de confirmación
    res.send('Logs generados');
});

module.exports = router;
