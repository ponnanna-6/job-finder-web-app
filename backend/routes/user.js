const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../schemas/user.schema')
const bodyParser = require('body-parser')
const router = express.Router()

router.post('/register', async (req, res)=>{
    const {name, email, password} = req.body
    const userExists = await User.findOne({email: email})
    if(userExists){
        return res.status(400).json({message: "User with email already exists !"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({name, email, password:hashedPassword})
    await newUser.save().then(()=>{
        res.status(200).json({message: "User created successfully!"})
    })
})

router.post('/login', async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(400).json({message: "User with email does not exist !!"})
        }
        const compare = await bcrypt.compare(password, user.password)
        if(!compare){
            return res.status(400).json({message: "Incorrect password !!"})
        }
        res.status(200).json({message: "Login successfully!"})
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await User.find({select: "name"});
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:email', async (req, res) => {
    try {
        const {email} = req.params
        const users = await User.find({email}).select('-password -_id -__v');
        console.log(users)
        if(!users.length){
            return res.status(400).json({message:"User not found"});
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router