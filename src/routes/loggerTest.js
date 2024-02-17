const express = require('express');
const router = express.Router();

// Endpoint para probar los logs
router.get('/loggerTest', (req, res) => {
    console.log(req.logger);
    req.logger.debug('Este es un mensaje de debug');
    req.logger.http('Este es un mensaje HTTP');
    req.logger.info('Este es un mensaje de información');
    req.logger.warn('Este es un mensaje de advertencia');
    req.logger.error('Este es un mensaje de error');
    req.logger.silly('Este es un mensaje silly');
    // Mensaje de confirmación
    res.send('Logs generados');
});

module.exports = router;
