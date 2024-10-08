//Importing modules
const express = require('express')
const dotenv = require('dotenv')
const { incomingReqLogger } = require('./middlewares')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const jobRouter = require('./routes/job')
const { default: mongoose } = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(incomingReqLogger)

//routes
app.use('/api/v1/', indexRouter)
app.use('/api/v1/user/', userRouter)
app.use('/api/v1/job/', jobRouter)

app.listen(process.env.PORT, (req, res)=>{
    console.log(`Server started on port ${process.env.PORT}`)
    mongoose.connect(process.env.MONGOOSE_URI_STRING).then(()=>{
        console.log("Connected to: ", process.env.MONGOOSE_URI_STRING)
    }).catch((error)=>{
        console.log("DB connection error")
    })
})