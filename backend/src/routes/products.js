import express from 'express'
import ProductController from '../controllers/productController.js'
import authMiddleware from '../helpers/authMiddleware.js'
import adminMiddleware from '../helpers/adminMiddleware.js'

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

productsRouter.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    const { success, statusCode, body } = await productController.addProduct(req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

productsRouter.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const { success, statusCode, body } = await productController.deleteProduct(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

productsRouter.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const { success, statusCode, body } = await productController.updateProduct(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})


export default productsRouter