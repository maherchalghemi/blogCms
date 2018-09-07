const router = require('express').Router();
const mongoose = require('mongoose');

const Commentaire = require("../Models/comment");
mongoose.connect('mongodb://localhost:27017/blogdb');

const commentModel = mongoose.model('comments', Commentaire);
 
router.get('/all', async (req, res) => {
    const result = await commentModel.find().populate({path:'author'}).exec();
    res.send(result);
});


router.post('/add', async (req, res) => {
    var post = req.body;
    console.log(post);

    const result = await commentModel.create(post);
    res.send(result);
   
});


router.get('/comment/:id', async (req, res) => {
    id = req.params.id;
    console.log(id);
    const result = await commentModel.findById(id).exec();
    res.send(result);
});


router.post('/update/:id', async (req, res) => {
    id = req.params.id;
    var post = req.body;
    var objectUpdate = {
        $set : post
    };
    const result = await commentModel.findByIdAndUpdate(id,objectUpdate).exec();
   
    res.send(result);
});


router.post('/delete/:id', async (req, res) => {
    id = req.params.id;
   
    const result = await commentModel.findByIdAndRemove(id).exec();
   
    res.send(result);
});

module.exports = router ;