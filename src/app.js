const express = require('express');
const session = require('express-session');
const passport = require('passport');
const winston = require('winston'); // Importa el paquete winston
const { format } = winston;
const { combine, timestamp, printf } = format;

const app = express();
const http = require('http').createServer(app);
const port = 8080;

// Función de middleware para verificar la autenticación
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Configuración del logger
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
  ]
});

// Logger middleware
app.use((req, res, next) => {
  req.logger = logger;
  next();
});

// Configuración de Express
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Rutas para el manejo de autenticación
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));

// Nueva ruta para /dashboard 
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  // Renderiza el panel de control o la página del dashboard
  res.render('dashboard', { user: req.user }); 
});

// Importa la ruta para productos de mocking
const mockingRoute = require('./routes/mockingRoute');
app.use('/mockingproducts', mockingRoute);

// Importa y utiliza la ruta para las sesiones
const sessionRoutes = require('./routes/session');
app.use('/api/sessions', sessionRoutes);

// Endpoint para probar los logs
app.get('/loggerTest', (req, res) => {
  console.log(req.logger);
  req.logger.debug('Este es un mensaje de debug');
  req.logger.http('Este es un mensaje HTTP');
  req.logger.info('Este es un mensaje de información');
  req.logger.warn('Este es un mensaje de advertencia'); // Cambiado de warning a warn
  req.logger.error('Este es un mensaje de error');
  req.logger.silly('Este es un mensaje fatal'); // Cambiado de fatal a silly
  // Mensaje de confirmación
  res.send('Logs generados');
});

// Middleware de manejo de errores
const { errorHandler } = require('./utils/errorHandler'); 
app.use(errorHandler); 

http.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
