// Importación del módulo nativo de Node: "FileSystem", específicamente el de promesas, asignado a la variable "fs".
import { promises as fs } from "fs"

//Función de clase constructora que recibe la ruta a trabajar desde el momento de generar la instancia.
export class CartManager {
      constructor() {
            this.path = './src/models/cartsDB.json'
            this.carts = []
            this.lastId = 0
            this.loadCarts()
      }

      loadCarts = async () => {
            try {
            const cartData = await fs.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(cartData)
            // Validación de si existe un carrito creado.
            if (this.carts.length > 0) {
                  this.lastId = Math.max(...this.carts.map(cart => cart.id))
                  }
            } catch (error) {
                  // Creación del archivo en caso de que no exista. 
                  console.log("Error. No se pudo cargar los carts", error)
                  await this.saveCarts();
            }
      }

      saveCarts = async () => {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2))
      }

      createCart = async () => {
            // Variable que aloja el nuevo carrito.
            const newCart = { id: ++this.lastId, products: [] };
            // Se guarda el nuevo producto en el array de Carts.
            this.carts.push(newCart);
            // Se guarda el nuevo array en el json de carts.
            await this.saveCarts();
            // Se retorna el nuevo cart.
            return newCart;
      }

      getCartById = async (cartId) => {
            try {
                  // Validación de si existe un cart con el id ingresado.
                  const cart = this.carts.find(cart => cart.id === cartId);
                  // Error en caso de que no exista.
                  if (!cart) {
                        throw new Error(`No existe un cart con el id ${cartId}. Intente nuevamente.`);
                  }
                  // Se retorna el cart seleccionado por id.
                  return cart;
            } catch (error) {
                  console.log("Error en el servidor al buscar el cart por id", error);
                  throw error;
            }
      }

      addProduct = async (cartId, prodId, quantity = 1) => {
            // Se trae el cart por id.
            const cart = await this.getCartById(cartId)
            // Valicación si existe un producto con el id ingresado por parámetro.
            const existingProduct = cart.products.find(products => products.product === prodId)
            // En caso de que exista:
            if (existingProduct) {
                  existingProduct.quantity += quantity
            // En caso contrario:
            } else {
                  cart.products.push({ product: prodId, quantity });
            }
            await this.saveCarts();
            return cart;
      }
}