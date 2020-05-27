const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler.js')
const Admin = require('../models/Admin.js')
const keys = require('../config/keys.js')

module.exports.login = async function(req, res){
    const candidate = await Admin.findOne({email: req.body.email})
    if(candidate){
        //проверка пользователя, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult){
            //генерация токена пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                adminId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }else{
            // пароли не совпали 
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова'
            })
        }
    } else {
        //пользователь нет ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    }
}

module.exports.registeradmin = async function(req, res){
    const candidate = await Admin.findOne({email: req.body.email})
    if (candidate){
        // пользователь существует, нужно отправить ошибку
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой'
        })
    } else {
        // нужно создать пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const admin = new Admin({
            fullname: req.body.fullname,
            phone: req.body.phone,
            position: req.body.position,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try{
            await admin.save()
            res.status(201).json(admin)
        } catch(e){
            errorHandler(res, e)
        }
    }
}
