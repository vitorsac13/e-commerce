import jwt from 'jsonwebtoken'

export default function adminMiddleware(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Acesso permitido apenas para administradores'
        })
    }

    return next()
}