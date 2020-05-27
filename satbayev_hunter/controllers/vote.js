const Vote = require('../models/Vote.js')
const errorHandler = require('../utils/errorHandler.js')



module.exports.getAll = async function(req, res) {
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

    if (req.query.fullname){
        query.fullname = req.query.fullname
    }

    try{
        const vote = await Vote
            .find(req.params)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)
                
        setTimeout(()=>{
            res.status(200).json(vote)
        }, 500)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res) {
    try{
        const vote = await Vote.findById(req.params.id)
        res.status(200).json(vote)
    } catch(e) {
        errorHandler(res, e)
    }
}


module.exports.create= async function(req, res){
    const vote = new Vote({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        faculty: req.body.faculty,
        docsSrc: req.body.docsSrc
    })

    try{
        await vote.save()
        res.status(201).json(vote)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res){
    try{
        await Vote.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Голосования удалены'
        })
    } catch(e) {
        errorHandler(res, e)
    }
}