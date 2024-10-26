const {JWT_SECRET} = require('./config')
const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')){
        res.status(401).json({
            msg: 'unauthorized'
        })
    }
    const tokenValue = token.split('Bearer ')[1]
    try{
        const payload = jwt.verify(tokenValue,JWT_SECRET)
        if (!payload.userId){
            res.status(401).json({
                msg: 'unauthorized'
            })
        }
        // console.log(payload)
        req.headers.userId = payload.userId
        next()
    }catch(error){
        res.status(401).json({
            msg: 'unauthorized'
        })
    }
}

module.exports = authMiddleware