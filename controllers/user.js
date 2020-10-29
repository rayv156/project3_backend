//from AlexMerced Auth Video #2

const User = require('../models/user')
const bcrypt = require('bcryptjs')
const {Router} = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {SECRET} = process.env
const cors = require('cors')
const auth = require('./../auth')


//create new user
router.post('/signup', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password,10)
        const newUser = await User.create(req.body)
        res.json(newUser)
    }
    catch(error){
        res.status(400).json({error})
    }
})

//login token
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (user){
            const match = await bcrypt.compare(password, user.password)
            if (match){
                const token = await jwt.sign({username}, SECRET)
                res.status(200).json({token})
            } else {
                res.status(400).json({error: "Password does not match"})
            }
        } else {
            res.status(400).json({error: "User does not exist"})
        }
    }
    catch(error){
        res.status(400).json({error})
    
    }
})

//Takes Middleware to validate user on frontend with token
router.get('user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router