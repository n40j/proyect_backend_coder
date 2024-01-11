require('dotenv').config();

module.exports = {
  // Configuración de la base de datos
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase',
  },

  // Otras configuraciones
  secretKey: process.env.SECRET_KEY || 'mysecretkey',
  port: process.env.PORT || 3000,
  
};

