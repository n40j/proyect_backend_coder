const mongoose = require('mongoose');
require('dotenv').config();
// URL de conexión a tu base de datos en MongoDB Atlas
const mongoURI = process.env.MONGODB_URI;

// Conexión a la base de datos
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

// Manejadores de eventos para la conexión a la base de datos
db.on('connected', () => {
  console.log('Conexión establecida con la base de datos');
});

db.on('error', (err) => {
  console.error(`Error de conexión a la base de datos: ${err.message}`);
});

// Exporta la conexión para ser utilizada en otros archivos de tu aplicación
module.exports = db;
