// Importación de Express JS:
import express from 'express';
// Creación del Router de Express JS:
const router = express.Router();
// Importación del manejador de productos.
import { ProductManager } from '../controllers/productManager.js'
// Llamado de la función constructora.
const productManager = new ProductManager;

// Ruta GET para renderizar el home.handlebars:
router.get('/', async (request, response) => {
      try {
            const products = await productManager.getProducts();
            response.render('home', {products});
      } catch (error) {
            console.log('Error al obtener los productos.', error);
            response.status(500).json({ error: 'Error al obtener los productos' });
      }
})

// Ruta GET para renderizar el realTimeProducts.handlebars:
router.get('/realtimeproducts', (request, response) => {
      response.render('realTimeProducts');
})

// Exportación del router para ser utilizado en la app:
export { router };

