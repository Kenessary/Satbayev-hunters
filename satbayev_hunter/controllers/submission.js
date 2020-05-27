const Submission = require('../models/Submission.js')
const errorHandler = require('../utils/errorHandler.js')

module.exports.getAll= async function(req, res){

    const query = req.params

    if(req.query.start){
        query.date = {
            $gte: req.query.start
        }
    }

    if (req.query.end){
        if(!query.date){
            query.date = {}
        }

        query.date['$lte']= req.query.end
    }

    if (req.query.name){
        query.name = req.query.name
    }
    if (req.query.surname){
        query.surname = req.query.surname
    }
    try{
        const submission = await Submission
        .find(req.params)
        .sort({date: -1})
        .skip(+req.query.offset)
        .limit(+req.query.limit)
        
        setTimeout(()=>{
            res.status(200).json(submission)
        }, 500)
    } catch(e) {
        errorHandler(res, e)
    }  
}

module.exports.getById= async function(req, res){
    try{
        const submission = await Submission.findById(req.params.id)
        res.status(200).json(submission)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.create= async function(req, res){
    const submission = new Submission({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        faculty: req.body.faculty,
        docsSrc: req.file ? req.file.path : ''
    })

    try{
        await submission.save()
        res.status(201).json(submission)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res){
    try{
        await Submission.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Заявка удалена'
        })
    } catch(e) {
        errorHandler(res, e)
    }
}