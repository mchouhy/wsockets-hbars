// Importación de Express JS:
import express from 'express';
// Creación del Router de Express JS:
const router = express.Router();

// Ruta GET para renderizar el index.handlebars:
router.get("/", (request, response) => {
      response.render("home");
})

// Exportación del router para ser utilizado en la app:
export default router;

