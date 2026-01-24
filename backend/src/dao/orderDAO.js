import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'

const collectionName = 'orders'

export default class OrderDAO {

    async getOrders(){
        const result = await Mongo.db.collection(collectionName).find({}).toArray()

        return result
    }

    async getOrdersByUserId(userId) {
        return await Mongo.db
            .collection(collectionName)
            .find({ userId })
            .sort({ createdAt: -1 })
            .toArray()
    }

    async getAvailableOrders(){
        const result = await Mongo.db.collection(collectionName).find({ available: true }).toArray()

        return result
    }

    async addOrder(orderData){
        orderData.status = 'pending'
        orderData.createdAt = new Date()

        const result = await Mongo.db
            .collection(collectionName)
            .insertOne(orderData)

        return result
    }

    async deleteOrder(orderId){
        const result = await Mongo.db.collection(collectionName).findOneAndDelete({ _id: new ObjectId(orderId) })
        return result
    }

    async updateProduct(orderId, orderData){
        
        const result = await Mongo.db.collection(collectionName).findOneAndUpdate( { _id: new ObjectId(orderId) }, { $set: orderData } )
        return result 
      
    }

}