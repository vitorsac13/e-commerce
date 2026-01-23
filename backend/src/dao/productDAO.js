import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'

const collectionName = 'products'

export default class ProductDAO {

    async getProducts(){
        const result = await Mongo.db.collection(collectionName).find({}).toArray()

        return result
    }

    async getProductById(productId) {
        const result = await Mongo.db.collection(collectionName).findOne({ _id: new ObjectId(productId) })

        return result
    }

    async getAvailableProducts(){
        const result = await Mongo.db.collection(collectionName).find({ available: true }).toArray()

        return result
    }

    async addProduct(productData){
        const result = await Mongo.db.collection(collectionName).insertOne(productData)

        return result
    }

    async deleteProduct(productId){
        const result = await Mongo.db.collection(collectionName).findOneAndDelete({ _id: new ObjectId(productId) })
        return result
    }

    async updateProduct(productId, productData){
        
        const result = await Mongo.db.collection(collectionName).findOneAndUpdate( { _id: new ObjectId(productId) }, { $set: productData } )
        return result 
      
    }

}