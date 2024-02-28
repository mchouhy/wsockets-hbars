// Importación del módulo nativo de Node: "FileSystem", específicamente el de promesas, asignado a la variable "fs".
import { promises as fs } from "fs"

//Función de clase constructora que recibe la ruta a trabajar desde el momento de generar la instancia.
export class ProductManager {

      constructor() {
            this.path = './src/models/productsDB.json'
      }

      // Funciones que leen el archivo json en el cual se guardan los objetos de productos, ejecuta el "parse" para transformar el JSON a objeto y devuelve el array de objetos de productos contenidos el archivo JSON.
      getProducts = async () => {
            try {
                  const productsDB = await this.readDB()
                  return productsDB
            } catch (error) {
                  console.log("Error al consultar el stock de la base de datos.")
            }
      }

      readDB = async () => {
            try {
                  const response = await fs.readFile(this.path, "utf-8")
                  const productsDBContent = JSON.parse(response)
                  return productsDBContent

            } catch (error) {
                  console.log('Error al leer la base de datos', error)
                  throw error
            }

      }
      // Función que busca en el archivo JSON que guarda los objetos de productos el producto que coincida con el id ingresado por argumento.
      // En caso de no existir un producto con el id ingresado por argumento se retorna un mensaje de error.
      // En caso de que exista un producto con el id ingresado por argumento se retorna el producto en cuestión.
      getProductById = async (prodId) => {
            try {
                  const response = await this.getProducts()
                  const product = response.find(prod => prod.id === prodId)
                  if (product) {
                        return product
                  } else {
                        console.log(`Error. El producto con el id: ${prodId} no existe.`)
                  }
            } catch (error) {
                  console.log('No existe un producto identificado con el id ingresado', error)
            }
      }

      // Función que agrega los objetos de productos al archivo JSON, validando previamente el cumplimiento de las condiciones de la preentrega.
      addProduct = async ({ title, description, code, price, status, stock, category, thumbnails }) => {
            try {
                  //Lectura del archivo JSON y parse.
                  const productsDB = await this.readDB()
                  // Validación 1: Mensaje de error en caso de que no se completen todos los campos requeridos.
                  if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
                  return console.log(`Error. Es necesario completar todos los campos del producto para que pueda ser agregado a la base de datos.`)
                  }
                  // Validación 2: Mensaje de error en caso de que el "code" del producto agregado ya exista.
                  const repeatedCode = productsDB.find(prod => prod.code === code)
                  if (repeatedCode) {
                  return console.log(`Error. El producto: "${title}" no pudo ser agregado porque ya existe un producto con el código ingresado.`)
                  }

                  // Variable que guarda el nuevo producto.
                  const newProduct = {
                        title,
                        description,
                        code,
                        price,
                        status: true,
                        stock,
                        category,
                        thumbnails: thumbnails || []
                  }
                  // Validación 3: Creación de un id autoincremental en cada producto agregado.
                  let lastId = 0
                  if (productsDB.length > 0) {
                  lastId = productsDB[productsDB.length - 1].id
                  }
                  newProduct.id = parseInt(lastId) + 1
                  // Se agrega al nuevo producto al array.
                  productsDB.push(newProduct)
                  // Se agrega el nuevo producto al archivo JSON
                  await fs.writeFile(this.path, JSON.stringify(productsDB, null, 2), "utf-8")
            } catch (error) {
                  console.log(`Error al agregar el producto: ${newProduct.title}.`, error)
            }
      }

      // Función que actualiza las propiedades de los objetos de productos almacenados en el archivo JSON. Si no existe el producto que se pretende actualizar se devuelve un mensaje de error.
      updateProduct = async (prodId, {title, description, price, thumbnails, code, stock, status, category}) => {
            try {
                  //Lectura del archivo JSON y parse.
                  const productsDB = await this.getProducts()
                  const productToUpdate = productsDB.find(prod => prod.id === prodId)
                  if (productToUpdate) {
                        productToUpdate.title = title || productToUpdate.title
                        productToUpdate.description = description || productToUpdate.description
                        productToUpdate.price = price || productToUpdate.price
                        productToUpdate.thumbnails = thumbnails || productToUpdate.thumbnails
                        productToUpdate.code = code || productToUpdate.code
                        productToUpdate.stock = stock || productToUpdate.stock
                        productToUpdate.status = status || productToUpdate.status
                        productToUpdate.category = category || productToUpdate.category
                        const updatedProductsToJSON = JSON.stringify(productsDB, null, 2)
                        await fs.writeFile(this.path, updatedProductsToJSON, 'utf-8')
                        return console.log(`El producto con el id: ${prodId} se ha actualizado con éxito en la base de datos. Estos son sus detalles actualizados: `, productToUpdate)
                  } else {
                        return console.log(`Error al actualizar. No existe un producto en la base de datos con el número de id: ${prodId}.`)
                  }
            } catch (error) {
                  console.log('Error al leer la base de datos, intente nuevamente.', error)

            }

      }

      deleteProductById = async (prodId) => {
            try {
                  //Lectura del archivo JSON y parse.
                  const productsDB = await this.getProducts()
                  const indexToRemove = productsDB.findIndex(prod => prod.id === prodId)
                  if (indexToRemove !== -1) {
                        productsDB.splice(indexToRemove, 1)
                        await fs.writeFile(this.path, JSON.stringify(productsDB, null, 2), 'utf-8')
                        return console.log(`El producto identificado con el id: ${prodId} ha sido eliminado con éxito y se ha actualizado el listado de productos.`)
                  } else {
                        return console.log(`Error al eliminar. El producto identificado con el id: ${prodId} no existe.`)
                  }
            } catch (error) {
                  console.log('Error al consultar la base de datos.', error)
            }

      }

}