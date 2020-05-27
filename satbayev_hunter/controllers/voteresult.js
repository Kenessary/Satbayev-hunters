const Voteresult = require('../models/Voteresult.js')
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
        const voteresult = await Voteresult
            .find(req.params)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)
            
        setTimeout(()=>{
            res.status(200).json(voteresult)
        }, 500)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res) {
    try{
        const voteresult = await Voteresult.findById(req.params.id)
        res.status(200).json(voteresult)
    } catch(e) {
        errorHandler(res, e)
    }
}


module.exports.create= async function(req, res){
    const voteresult = new Voteresult({
        name: req.body.name,
        surname: req.body.surname,
        position: req.body.position,
        posVote: req.body.posVote,
        negVote: req.body.negVote,
        totalvote: req.body.totalvote
    })

    try{
        await voteresult.save()
        res.status(201).json(voteresult)
    } catch(e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res){
    try{
        await Voteresult.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Результаты удалены'
        })
    } catch(e) {
        errorHandler(res, e)
    }
}