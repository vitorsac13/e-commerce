import UserDAO from "../dao/userDAO.js";
import { ok, serverError } from '../helpers/httpResponse.js'

export default class UserController {

    constructor() {
        this.dao = new UserDAO()
    }

    async getUsers(){
        try {
            const users = await this.dao.getUsers()
            return ok(users)

        } catch (error) {
            return serverError(error)
        }
    }

    async deleteUser(userId){
        try {
            const result = await this.dao.deleteUser(userId)
            return ok(result)

        } catch (error) {
            return serverError(error)
        }
    }

    async updateUser(userId, userData){
        try {
            const result = await this.dao.updateUser(userId, userData)
            return ok(result)
            
        } catch (error) {
            return serverError(error)
        }
    }
}