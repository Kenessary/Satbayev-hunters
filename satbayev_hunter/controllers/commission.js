const Admin = require('../models/Admin.js')
const errorHandler = require('../utils/errorHandler')

module.exports.getAllCommission = async function(req, res){
    try{
        const commissions = await Admin.find(req.params)
        res.status(200).json(commissions)
    } catch(e) {
        errorHandler(res, e)
    }  
}

module.exports.getByIdCommission= async function(req, res){
    try{
        const commission = await Admin.findById(req.params.id)
        res.status(200).json(commission)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res){
    try{
        await Admin.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Комиссии удалена'
        })
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res){
    try{
        const commission = await Commission.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(commission)
    } catch(e) {
        errorHandler(res, e)
    }
}