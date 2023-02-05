const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const {user_watchlist, user} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role, watchlistId) => {
    return jwt.sign(
        {id, email, role, watchlistId},
         process.env.SECRET_KEY,
        {expiresIn: '24h'}     
    )
}

class UserController {

    async registration(req, res, next) {
        const {email, password} = req.body
        const role = "USER"

        if(!email || !password) {
            return next(ApiError.badRequest('Недействительный почтовый ящик или пароль'))
        }
    
        const email_parser = /^\S+@\S+\.\S+$/
        if(email.length < 5 || !email_parser.test(email)) {
            return next(ApiError.badRequest('Укажите настоящий почтовый ящик'))
        }

        if(password.length<5) {
            return next(ApiError.badRequest('Пароль должен состоять как минимум из 5 символов'))
        }

        const candidate = await user.findOne({where: {email}})

        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 4)

        const User = await user.create({email, role, password: hashPassword})
        const User_watchlist = await user_watchlist.create({userId: User.id})
        const token = generateJwt(User.id, User.email, User.role, User_watchlist.id)
        return res.json({token})
    }
    async login(req, res, next) {
        const {email, password} = req.body
        const User = await user.findOne({where: {email}})
        
        if(!User) {
            return next(ApiError.badRequest('Недействительный почтовый ящик или пароль'))
        }

        const User_watchlist = await user_watchlist.findOne({where: {userId: User.id}})

        let comparePassword = bcrypt.compareSync(password, User.password)

        if(!comparePassword) {
            return next(ApiError.badRequest('Недействительный почтовый ящик или пароль'))
        }

        const token = generateJwt(User.id, User.email, User.role, User_watchlist.id)
        return res.json({token})
    }   

    async check(req, res, next) {
        const User_watchlist = await user_watchlist.findOne({where: {userId: req.user.id}})
        const token = generateJwt(req.user.id, req.user.email, req.user.role, User_watchlist.id)
        return res.json({token})
    }
}

module.exports = new UserController()