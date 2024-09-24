const express = require('express')

const router = express.Router()

router.get('/', (req, res)=>{
    res.send("HELLO FROM JOB FINDER")
})

module.exports = router