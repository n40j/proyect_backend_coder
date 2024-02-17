const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

// Conexión a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    //Manejadores de eventos para la conexión a la base de datos
    console.log("Conexión establecida con la base de datos");
  } catch (error) {
    //Manejadores de eventos para la conexión a la base de datos
    console.error(`Error de conexión a la base de datos: ${error.message}`);
  }
};

// Exporta la conexión para ser utilizada en otros archivos de tu aplicación
module.exports = connectDB;
