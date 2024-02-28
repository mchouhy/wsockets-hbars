// Importación del Router de Express JS.
import { Router } from "express"
// Importación del manejador de productos.
import { ProductManager } from '../controllers/productManager.js'
// Creación del Router de Products.
const productsRouter = Router()
// Llamado de la función constructora.
const productManager = new ProductManager

// Rutas de productos:

// Get que retorna todos los productos o los productos limitados aplicando un query.
productsRouter.get("/", async (request, response) => {
    try {
        // Se define la variable de límite y se aplica el método para que reemplazo el string por un number.  
        let { limit } = request.query
        const products = await productManager.getProducts()
        if (limit) {
            const limitedProducts = products.slice(0, limit)
            return response.json(limitedProducts)
        } else {
            return response.json(products)
        }
    } catch (error) {
        console.log('Error al obtener los productos.', error);
        response.status(500).json({ error: 'Error al obtener los productos' });
    }
})

// Get que retorna un producto por id ingresado.
productsRouter.get("/:prodId", async (request, response) => {
    // Se define la variable que aplica el request params del id a ingresar por el cliente.
    const { prodId } = request.params
    try {
        const product = await productManager.getProductById(parseInt(prodId))
        response.json(product)
    } catch (error) {
        response.status(500).json({error: 'No existe un producto con el id ingresado.'})
    }
})

// Post que agrega un nuevo producto al archivo json de productos.
productsRouter.post("/", async (request, response) => {
    const newProduct = request.body
    try {
        await productManager.addProduct(newProduct)
        response.status(201).json({message: 'Producto agregado con éxito.'})
    } catch (error) {
        response.status(500).json({error: 'Error. No se pudo agregar el producto.'})   
    }
})

// Put que actualiza el producto seleccionado por id.
productsRouter.put("/:prodId", async (request, response) => {
    const { prodId } = request.params
    const product = request.body
    try {
        await productManager.updateProduct(parseInt(prodId), product)
        response.status(201).json({message: "Producto actualizado exitosamente."})
    } catch (error) {
        response.status(500).json({error: 'No se pudo actualizar el producto.'})
    }
})

// Delete que elimina el producto seleccionado por id.
productsRouter.delete("/:prodId", async (request, response) => {
    const { prodId } = request.params
    try {
        await productManager.deleteProductById(parseInt(prodId))
        response.status(201).json({message: "Producto eliminado con éxito."})
    } catch (error) {
        response.status(500).json({error: 'No se pudo eliminar el producto.'})
    }
})

export { productsRouter }