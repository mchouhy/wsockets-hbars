// Importación de Express JS:
import express from 'express';
// Creación del Router de Express JS:
const router = express.Router();
// Importación del manejador de productos.
import { ProductManager } from '../controllers/productManager.js'
// Llamado de la función constructora.
export const productManager = new ProductManager;

// Ruta GET para renderizar el home.handlebars:
router.get('/', async (request, response) => {
      try {
            const title = "Listado de productos";
            const products = await productManager.getProducts();
            response.render('home', { title, products });
      } catch (error) {
            console.log('Error al obtener los productos.', error);
            response.status(500).json({ error: 'Error al obtener los productos' });
      }
})

// Ruta GET para renderizar el realTimeProducts.handlebars:
router.get('/realtimeproducts', async (request, response) => {
      try {
            const title = "Productos en tiempo real";
            const products = await productManager.getProducts();
            response.render('realTimeProducts', { title, products });
            
      } catch (error) {
            console.log('Error al obtener los productos.', error);
            response.status(500).json({ error: 'Error al obtener los productos' });
      }
})

// Exportación del router para ser utilizado en la app:
export { router };

