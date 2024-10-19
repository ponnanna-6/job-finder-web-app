const moment = require('moment')
const fs = require('fs')

const incomingReqLogger = ((req,res,next)=>{
    const date = moment().format("DD-MM-YYYY");
    const time = moment(new Date()).format("HH:mm:ss:SSS");
    // fs.appendFileSync('log.txt', `(${date} ${time}) ${req.method} ${req.url}\n`)
    next()
})

module.exports =  {
    incomingReqLogger
}