const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../schemas/user.schema')
const bodyParser = require('body-parser')
const router = express.Router()
const jwt = require('jsonwebtoken')

//register user
router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        const userWithEmail = await User.findOne({ email: email });
        if (userWithEmail) {
            return res.status(400).json({ message: "User with email already exists!" });
        }

        const userWithMobile = await User.findOne({ mobile: mobile });
        if (userWithMobile) {
            return res.status(400).json({ message: "User with mobile number already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, mobile, password: hashedPassword });
        await newUser.save();

        return res.status(200).json({ message: "User created successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred. Please try again later.", error: error});
    }
});


//login user
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
        const payload = {id: user._id}
        const token = jwt.sign(payload, process.env.JWT_TOKEN)
        res.send(token)
    } catch (err) {
        res.status(400).json(err);
    }
})

//Fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).select('-password -_id -__v');
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Fetch user by email
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