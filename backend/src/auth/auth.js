import express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import crypto from 'crypto'
import { Mongo } from '../database/mongo.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

const collectionName = 'users'

passport.use(new LocalStrategy({ usernameField: 'email'}, async (email, password, callback) => {
    // Busca o usuário no banco de dados pelo email
    const user = await Mongo.db
        .collection(collectionName)
        .findOne({ email: email })

    // Se não encontrar o usuário, falha na autenticação
    if (!user) {
        return callback(null, false)
    }

    // Converte o salt salvo no banco para Buffer
    const saltBuffer = Buffer.from(user.salt.buffer)

    // Gera o hash da senha digitada usando PBKDF2
    crypto.pbkdf2(password, saltBuffer, 310000, 16, 'sha256', (err, hashedPassword) => {
        // Se ocorrer erro na geração do hash
        if (err) {
            return callback(err, false)
        }

        // Converte a senha salva no banco para Buffer
        const userPasswordBuffer = Buffer.from(user.password.buffer)

        // Compara o hash gerado com o hash salvo no banco
        if (!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
            // Senha incorreta
            return callback(null, false)
        }

        // Remove campos sensíveis antes de retornar o usuário
        const { password, salt, ...rest } = user

        // Autenticação bem-sucedida
        return callback(null, rest)
    })
}))

const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
    // Verifica no banco se já existe um usuário com o mesmo email
    const checkUser = await Mongo.db
        .collection(collectionName)
        .findOne({ email: req.body.email })

    // Se o usuário já existir, retorna erro
    if (checkUser) {
        return res.status(500).send({
            success: false,
            statusCode: 500,
            body: {
                text: 'User already exists!'
            }
        })
    }

    // Gera um salt aleatório para a senha
    const salt = crypto.randomBytes(16)

    // Criptografa a senha usando PBKDF2
    crypto.pbkdf2(req.body.password, salt, 310000, 16, 'sha256', async (err, hashedPassword) => {
        // Se ocorrer erro na criptografia
        if (err) {
            return res.status(500).send({
                success: false,
                statusCode: 500,
                body: {
                    text: 'Error on crypto password!',
                    err: err
                }
            })
        }

        // Insere o novo usuário no banco de dados
        const result = await Mongo.db
            .collection(collectionName)
            .insertOne({
                fullname: req.body.fullname,
                email: req.body.email,
                password: hashedPassword,
                salt: salt,
                role: 'user'
            })

        // Se o usuário foi inserido com sucesso
        if (result.insertedId) {
            // Busca o usuário recém-criado
            const user = await Mongo.db
                .collection(collectionName)
                .findOne({ _id: new ObjectId(result.insertedId) })

            // Gera o token JWT
            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )

            // Remove dados sensíveis antes de enviar ao frontend
            const { password, salt, ...safeUser } = user

            // Retorna sucesso e já autentica o usuário
            return res.send({
                success: true,
                statusCode: 200,
                body: {
                    text: 'User registered correctly!',
                    token,
                    user: safeUser,
                    logged: true
                }
            })
        }
    })
})

authRouter.post('/login', (req, res) => {
    // Autentica o usuário usando a estratégia local do Passport
    passport.authenticate('local', (error, user) => {
        // Se ocorrer algum erro interno
        if (error) {
            return res.status(500).send({
                success: false,
                statusCode: 500,
                body: {
                    text: 'Error during authentication!',
                    
                }
            })
        }

        // Se o usuário não existir ou a senha estiver incorreta
        if (!user) {
            return res.status(400).send({
                success: false,
                statusCode: 400,
                body: {
                    text: 'User not found!',
                    
                }
            })
        }

        // Gera o token JWT para autenticação
        const token = jwt.sign(
            {
                id: user._id.toString(),
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        // Remove dados sensíveis antes de enviar ao frontend
        const { password, salt, ...safeUser } = user

        // Retorna sucesso com os dados seguros do usuário e o token
        return res.status(200).send({
            success: true,
            statusCode: 200,
            body: {
                text: 'User logged in correctly!',
                user: safeUser,
                token
            }
        })
    })(req, res)
})
export default authRouter