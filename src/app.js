const express = require('express');
const app = express();
const http = require('http').createServer(app); // Crea el servidor HTTP
const io = require('socket.io')(http); // Inicializa Socket.io
const port = 8080;

const ProductManager = require('./ProductManager');
const productManager = new ProductManager('data/productos.json');

// Configurar Handlebars como motor de plantillas
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('public')); // Si tienes archivos estáticos en una carpeta 'public'

app.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

// Realiza las mismas operaciones para '/realtimeproducts' pero usando WebSocket
io.on('connection', (socket) => {
  console.log('Usuario conectado');
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

  socket.on('newProduct', async (product) => {
    // Agrega el nuevo producto a la lista de productos
    await productManager.addProduct(product);
    io.emit('productAdded', product);
  });

  socket.on('deleteProduct', async (productId) => {
    // Elimina el producto con el ID proporcionado
    await productManager.deleteProduct(productId);
    io.emit('productDeleted', productId);
  });
});

// Define una ruta para '/realtimeproducts' que renderiza la vista 'realTimeProducts.handlebars'
app.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

http.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
