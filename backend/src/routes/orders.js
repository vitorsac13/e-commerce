import express from 'express'
import OrderController from '../controllers/orderController.js'

const ordersRouter = express.Router()

const orderController = new OrderController()

ordersRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await orderController.getOrders()

    res.status(statusCode).send({ success, statusCode, body })
})

ordersRouter.post('/', async (req, res) => {
    const { success, statusCode, body } = await orderController.addOrder(req.body)
    res.status(statusCode).send({ success, statusCode, body })
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