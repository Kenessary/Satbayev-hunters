const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const Adminmain = mongoose.model('adminsmain')
const keys = require('../config/keys')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try{
                const adminmain = await Adminmain.findById(payload.adminmainId).select('email id')

                if(adminmain){
                    done(null, adminmain)
                } else {
                    done(null, false)
                }
            } catch(e){
                console.log(e)
            }  
        })
    )
}