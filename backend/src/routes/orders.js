import express from 'express'
import OrderController from '../controllers/orderController.js'
import authMiddleware from '../helpers/authMiddleware.js'

const ordersRouter = express.Router()

const orderController = new OrderController()

ordersRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await orderController.getOrders()

    res.status(statusCode).send({ success, statusCode, body })
})

ordersRouter.get('/my', authMiddleware, async (req, res) => {
    const { success, statusCode, body } =
        await orderController.getMyOrders(req.user)

    res.status(statusCode).send({ success, statusCode, body })
})

ordersRouter.post('/', authMiddleware, async (req, res) => {
    const result = await orderController.addOrder(req.body, req.user)
    res.status(result.statusCode).send(result)
})

ordersRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await orderController.deleteOrder(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

ordersRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await orderController.updateOrder(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})


export default ordersRouter