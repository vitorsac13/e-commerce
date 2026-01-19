import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'

const collectionName = 'products'

export default class OrderDAO {

    async getOrders(){
        const result = await Mongo.db.collection(collectionName).find({}).toArray()

        return result
    }

    async getAvailableOrders(){
        const result = await Mongo.db.collection(collectionName).find({ available: true }).toArray()

        return result
    }

    async addOrder(orderData){
        const result = await Mongo.db.collection(collectionName).insertOne(orderData)

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