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