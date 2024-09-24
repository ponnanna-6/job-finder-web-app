//Importing modules
const express = require('express')
const moment = require('moment')
const dotenv = require('dotenv')
const fs = require('fs')

//Init variables
dotenv.config()
const app = express()

//Middlewares
app.use((req,res,next)=>{
    const date = moment().format("DD-MM-YYYY");
    const time = moment(new Date()).format("HH:mm:ss:SSS");
    fs.appendFileSync('log.txt', `(${date} ${time}) ${req.method} ${req.url}\n`)
    next()
})

app.listen(process.env.PORT, (req, res)=>{
    console.log(`Server started on port ${process.env.PORT}`)
})

app.get('/', (req, res)=>{
    res.send("HELLO WORLD")
})