// Importación de Express JS (https://expressjs.com/en/starter/hello-world.html):
import express from 'express';
// Importación del motor de plantillas Handlebars (https://www.npmjs.com/package/express-handlebars):
import { engine } from 'express-handlebars';
// Importación del Socket.io (https://socket.io/docs/v4/tutorial/introduction):
import { Server } from 'socket.io';
// Número de puerto del servidor:
const PORT = 8080;
// Creación de la app que utilizará Express JS y Handlebars:
const app = express();
// Importación de la vista "home.handlebars":
import router from './routes/views.router.js';

// Directorio raíz desde el cual Express servirá los archivos estáticos cuando se realicen solicitudes HTTP:
app.use(express.static('../src/public'))
// Aplicación del motor de plantillas Handlebars a todos los archivos con la extensión ".handlebars":
app.engine('handlebars', engine());
// Renderización de las vistas de la aplicación a través de Handlebars:
app.set('view engine', 'handlebars');
// Directorio raíz desde el cual deben leerse los archivos con la extensión ".handlebars":
app.set('views', './views');
// Utilización de la ruta "home.handlebars":
app.use('/', router);

// Función que escucha cualquier cambio en el servidor:
app.listen(PORT, () => console.log(`Escuchando cualquier cambio en el puerto: ${PORT}`));