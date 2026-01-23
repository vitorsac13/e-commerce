import ProductDAO from "../dao/productDAO.js";
import { ok, serverError } from '../helpers/httpResponse.js'

export default class ProductController {

    constructor() {
        this.dao = new ProductDAO()
    }

    async getProducts(){
        try {
            const products = await this.dao.getProducts()
            return ok(products)

        } catch (error) {
            return serverError(error)
        }
    }

    async getProductById(productId) {
        try {
            const product = await this.dao.getProductById(productId)
            return ok(product)
        } catch (error) {
            return serverError(error)
        }
    }

    async getAvailableProducts(){
        try {
            const products = await this.dao.getAvailableProducts()
            return ok(products)

        } catch (error) {
            return serverError(error)
        }
    }

    async addProduct(productData){
        try {
            const result = await this.dao.addProduct(productData)
            return ok(result)

        } catch (error) {
            return serverError(error)
        }
    }

    async deleteProduct(productId){
        try {
            const result = await this.dao.deleteProduct(productId)
            return ok(result)

        } catch (error) {
            return serverError(error)
        }
    }

    async updateProduct(productId, productData){
        try {
            const result = await this.dao.updateProduct(productId, productData)
            return ok(result)
            
        } catch (error) {
            return serverError(error)
        }
    }
}