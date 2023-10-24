const express = require('express');
const ProductManager = require('./ProductManager'); 

const app = express();
const port = 3000; 

const productManager = new ProductManager('productos.json'); 

app.use(express.json());

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if (limit) {
      res.json(products.slice(0, parseInt(limit)));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

