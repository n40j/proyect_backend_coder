const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const app = express();
const http = require('http').createServer(app);
const port = 8080;

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

// Implementación de Passport LocalStrategy
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Aquí se debería verificar en la base de datos si el usuario existe
    // y si la contraseña coincide utilizando bcrypt
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));

// Serialización y deserialización de usuarios
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Aquí se debería obtener el usuario de la base de datos por su ID
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Rutas para el manejo de autenticación
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));

app.get('/', (req, res) => {
  res.render('login'); // Renderiza la vista del formulario de inicio de sesión
});

http.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
