import express from 'express'
import ProductController from '../controllers/productController.js'

const productsRouter = express.Router()

const productController = new ProductController()

productsRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await productController.getProducts()

    res.status(statusCode).send({ success, statusCode, body })
})

productsRouter.get('/:id', async (req, res) => {
    const { success, statusCode, body } = await productController.getProductById(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

productsRouter.get('/availables', async (req, res) => {
    const { success, statusCode, body } = await productController.getAvailableProducts()

    res.status(statusCode).send({ success, statusCode, body })
})

productsRouter.post('/', async (req, res) => {
    const { success, statusCode, body } = await productController.addProduct(req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

productsRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await productController.deleteProduct(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

productsRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await productController.updateProduct(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})


export default productsRouter