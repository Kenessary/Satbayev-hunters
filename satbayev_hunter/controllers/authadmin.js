const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler.js')
const Adminmain = require('../models/Adminmain.js')
const keys = require('../config/keys.js')


module.exports.login = async function(req, res){
    const onlyadmin = await Adminmain.findOne({email: req.body.email})
    if (onlyadmin){
        //проверка email админа, админ существует
        const passwordResult = bcrypt.compareSync(req.body.password, onlyadmin.password)
        const secretwordResult = bcrypt.compareSync(req.body.secretword, onlyadmin.secretword)
        if(passwordResult, secretwordResult){
            //генерация токена пароли совпали
            const token = jwt.sign({
                email: onlyadmin.email,
                adminmainId: onlyadmin._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }else{
            // пароли не совпали 
            res.status(401).json({
                message: 'Пароли и кодовое слово не совпадают. Попробуйте снова'
            })
        }
    } else {
        //пользователь нет ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    }
}

module.exports.register = async function(req, res){
    const onlyadmin = await Adminmain.findOne({email: req.body.email})
    if (onlyadmin){
        // пользователь существует, нужно отправить ошибку
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой'
        })
    } else {
        // нужно создать пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const secretword = req.body.secretword

        const adminmain = new Adminmain({
            name: req.body.fullname,
            phone: req.body.phone,
            position: req.body.position,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            secretword: bcrypt.hashSync(secretword, salt)
        })
        try{
            await adminmain.save()
            res.status(201).json(adminmain)
        } catch(e){
            errorHandler(res, e)
        }
    }
}