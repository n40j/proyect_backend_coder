const express = require('express');
const session = require('express-session');
const passport = require('passport');
const winston = require('winston'); // Importa el paquete winston
const { format } = winston;
const { combine, timestamp, printf } = format;

const app = express();
const http = require('http').createServer(app);
const port = 8080;

// Agregar conexión a la base de datos
const connectDB = require("./db.js");
connectDB();

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

// Configuración de express-session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Inicialización de Passport
const initPassport = require("./config/passport");
initPassport();
app.use(passport.initialize());
app.use(passport.session());

// Función de middleware para verificar la autenticación
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

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

// Resto de tus rutas y configuraciones aquí...

// Middleware de manejo de errores
const { errorHandler } = require('./utils/errorHandler'); 
app.use(errorHandler); 

http.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
