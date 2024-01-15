const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
const http = require('http').createServer(app);
const port = 8080;

// Reemplaza con la importación del modelo de usuario (User)
const User = require('./dao/models/User'); // Reemplaza con la ruta correcta
const configurePassport = require('./config/passport'); // Importa las estrategias de Passport

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

// Configuración de las estrategias de Passport
configurePassport(); // Llama a la función de configuración de Passport

// Rutas para el manejo de autenticación
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));

// Nueva ruta para /dashboard 
app.get('/dashboard', (req, res) => {
  // Renderiza el panel de control o la página del dashboard
  res.render('dashboard'); 
});

// Importa y utiliza la ruta para las sesiones
const sessionRoutes = require('./routes/session');
app.use('/api/sessions', sessionRoutes);

http.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
