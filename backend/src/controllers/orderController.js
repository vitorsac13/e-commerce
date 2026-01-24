import OrderDAO from "../dao/orderDAO.js";
import { ok, serverError } from '../helpers/httpResponse.js'
import { ObjectId } from 'mongodb'

export default class OrderController {

    constructor() {
        this.dao = new OrderDAO()
    }

    async getOrders(){
        try {
            const orders = await this.dao.getOrders()
            return ok(orders)

        } catch (error) {
            return serverError(error)
        }
    }

    async getMyOrders(user) {
        try {
            const orders = await this.dao.getOrdersByUserId(
                new ObjectId(user.id)
            )

            return ok(orders)
        } catch (error) {
            console.error('❌ ERRO AO BUSCAR MEUS PEDIDOS', error)
            return serverError(error)
        }
    }

    async getAvailableOrders(){
        try {
            const orders = await this.dao.getAvailableOrders()
            return ok(orders)

        } catch (error) {
            return serverError(error)
        }
    }

    async addOrder(orderData, user) {
        try {
            const order = {
                items: orderData.items,
                paymentMethod: orderData.paymentMethod,
                total: orderData.total,

                userId: new ObjectId(user.id),

                delivery: {
                    name: orderData.user.name,
                    email: orderData.user.email,
                    address: orderData.user.address
                },

                status: 'pending',
                createdAt: new Date()
            }

            const result = await this.dao.addOrder(order)
            return ok(result)

        } catch (error) {
            console.error('❌ ERRO AO CRIAR PEDIDO:', error)
            return serverError(error)
        }
    }

    async deleteOrder(orderId){
        try {
            const result = await this.dao.deleteOrder(orderId)
            return ok(result)

        } catch (error) {
            return serverError(error)
        }
    }

    async updateOrder(orderId, orderData){
        try {
            const result = await this.dao.updateOrder(orderId, orderData)
            return ok(result)
            
        } catch (error) {
            return serverError(error)
        }
    }
}