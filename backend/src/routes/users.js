import express from 'express'
import UserController from '../controllers/userController.js'

const usersRouter = express.Router()

const userController = new UserController()

usersRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await userController.getUsers()

    res.status(statusCode).send({ success, statusCode, body })
})

usersRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await userController.deleteUser(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

usersRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await userController.updateUser(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})


export default usersRouter