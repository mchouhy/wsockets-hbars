// Console log que verifica que Handlebars está funcionando correctamente:
console.log("Handlebars funcionando correctamente.");
// Generación de una instancia de socket del lado del cliente:
const socket = io();
// Generación de un mensaje emitido por cliente:
socket.emit("client-message", "Soy el cliente enviando un mensaje.");
// Recibiendo mensaje emitido por el servidor en app.js:
socket.on("server-message", (data) => {
      console.log(data);
})
// Importación del manejador de productos.
import { ProductManager } from "../controllers/productManager.js";
// Llamado de la función constructora.
const productManager = new ProductManager;

const titleInput = document.getElementById("title").value;
const descriptionInput = document.getElementById("description").value;
const priceInput = document.getElementById("price").value;
const thumbnailsInput = document.getElementById("thumbnails").value;
const stockInput = document.getElementById("stock").value;
const codeInput = document.getElementById("code").value;
const statusInput = document.getElementById("status").value;
const categoryInput = document.getElementById("category").value;
const addProductBtn = document.getElementById("addProductBtn").value;

addProductBtn.addEventListener("click", () => {
      productManager.addProduct(
            {titleInput: titleInput,
            descriptionInput: descriptionInput,
            codeInput: codeInput,
            priceInput: priceInput,
            statusInput: statusInput,
            stockInput: stockInput,
            categoryInput: categoryInput,
            thumbnailsInput: thumbnailsInput});
})