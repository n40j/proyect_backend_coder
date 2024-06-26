const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const winston = require('winston');
const { format } = winston;
const { combine, timestamp, printf } = format;
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const http = require('http').createServer(app);
const port = 8080;

// Agregar conexión a la base de datos
const connectDB = require("./db.js");
connectDB();

// Importar e inicializar Passport
const initPassport = require("./config/passport");
initPassport();
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Middleware de connect-flash
app.use(flash());

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

// Definir especificaciones OpenAPI
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Mi Aplicación',
      version: '1.0.0',
      description: 'Documentación de la API de Mi Aplicación',
    },
  },
  apis: ['./routes/*.js'], // Ruta donde se encuentran tus archivos de rutas con las especificaciones
};

const specs = swaggerJsdoc(options);

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Ruta para la página de inicio
app.get('/', (req, res) => {
  // Redirecciona al usuario al panel de control si está autenticado
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    // Redirecciona al usuario a la página de inicio de sesión si no está autenticado
    res.redirect('/login');
  }
});

// Rutas para el manejo de autenticación
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));

// Importa el controlador de usuarios
const UserController = require('./controllers/UserController.js');

// Rutas para el manejo de usuarios
app.put('/api/users/:uid/premium', ensureAuthenticated, UserController.updateToPremium);
app.delete('/api/users/inactive', ensureAuthenticated, UserController.deleteInactiveUsers);

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

// Middleware para manejar errores en todas las rutas y middlewares
app.use((err, req, res, next) => {
  console.error('Error en la aplicación:', err);
  res.status(500).send('Algo salió mal en el servidor');
});

http.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
