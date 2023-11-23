const express = require('express');
const app = express();
const http = require('http').createServer(app); // Crea el servidor HTTP
const io = require('socket.io')(http); // Inicializa Socket.io
const port = 8080;

// Importa el modelo de Mongoose para Product
const Product = require('./models/Product');

app.use(express.json());
app.use(express.static('public'));

// Manejar la lista de productos con Mongoose
app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('home', { products }); // Renderiza la vista 'home' con los productos
  } catch (error) {
    res.status(500).send('Error al obtener los productos');
  }
});

// Realiza operaciones para '/realtimeproducts' usando WebSocket y Mongoose
io.on('connection', (socket) => {
  console.log('Usuario conectado');
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

  socket.on('newProduct', async (productData) => {
    try {
      const newProduct = await Product.create(productData);
      io.emit('productAdded', newProduct);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      await Product.findByIdAndDelete(productId);
      io.emit('productDeleted', productId);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  });
});

// Escucha en el puerto especificado
http.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

