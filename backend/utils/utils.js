const jwt = require('jsonwebtoken')

const isAuth = (req) => {
    const token = req.headers.authorization
    try { 
        if(!token){
            return false
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        return true
    } catch (error) {
        return false
    }
}

module.exports = {isAuth}