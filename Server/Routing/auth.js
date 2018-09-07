const router = require('express').Router();
const User = require('../Models/user');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogdb');
const userModel = mongoose.model('users', User);
const jwt = require('jsonwebtoken');


// create API For Login 
router.post('/login', async (req, res) => {

    const result = await userModel.findOne({ email: req.body.email });

    if (!result) {
        res.status(403).send({ message: 'user not found' });
    }

    if (result.password !== req.body.password) {
        res.status(402).send({ message: 'invalid password' });
    }
    const token = jwt.sign({ data: result }, "pass123")
    res.send({user : result, message: 'you are sign in', userToken: token });

});


// create API For Register
router.post('/register', async (req, res) => {
    var post = req.body;
    const result = await userModel.create(post);
   
    const token = jwt.sign({ data: result }, "pass123")
    res.send({ user : result, message: 'you are sign up', userToken: token });
    
});

module.exports = router;