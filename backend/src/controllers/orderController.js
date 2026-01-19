import OrderDAO from "../dao/orderDAO.js";
import { ok, serverError } from '../helpers/httpResponse.js'

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

    async getAvailableOrders(){
        try {
            const orders = await this.dao.getAvailableOrders()
            return ok(orders)

        } catch (error) {
            return serverError(error)
        }
    }

    async addOrder(orderData){
        try {
            const result = await this.dao.addOrder(orderData)
            return ok(result)

        } catch (error) {
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