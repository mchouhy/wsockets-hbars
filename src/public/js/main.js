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
// Variable que aloja el formulario para agregar productos.
const addProductForm = document.getElementById("addProductForm");
// Función que escucha el evento submit, guarda los valores ingresados y los envía al socket del lado del servidor para aplicarlo al json.
addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("submit")

      let titleInput = document.getElementById("title").value;
      let descriptionInput = document.getElementById("description").value;
      let priceInput = document.getElementById("price").value;
      let thumbnailsInput = document.getElementById("thumbnails").value;
      let stockInput = document.getElementById("stock").value;
      let codeInput = document.getElementById("code").value;
      let statusInput = document.getElementById("status").value;
      let categoryInput = document.getElementById("category").value;

      const newProduct = {
            titleInput,
            descriptionInput,
            priceInput,
            thumbnailsInput,
            stockInput,
            codeInput,
            statusInput,
            categoryInput
      }

      socket.emit("addProduct", newProduct);
});

socket.on("products", (data) => {
      const productsCards = document.getElementById("productsRT");
      productsCards.innerHTML = "";
      data.forEach(product => {
            let productCard = document.createElement("div").className("products-wrapper");
            productCard.innerHTML = `
            <h2>Nombre:<br> ${product.title}</h2>
            <p>Descripción:<br> ${product.description}</p>
            <p>Precio:<br> €${product.price}</p>
            <button id="deleteBtn">Eliminar producto</button>
            `
      productsCards.appendChild(productCard);
      })
})