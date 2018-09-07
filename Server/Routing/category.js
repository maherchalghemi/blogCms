const router = require('express').Router();
const mongoose = require('mongoose');

const Category = require("../Models/category");
mongoose.connect('mongodb://localhost:27017/blogdb');

const categoryModel = mongoose.model('categorie', Category);

router.get('/all', async (req, res) => {
    const result = await categoryModel.find().populate({path:'articles'}).exec();
    res.send(result);
});


router.post('/add', async (req, res) => {
    var post = req.body;
    console.log(post);

    const result = await categoryModel.create(post);
    res.send(result);
   
});


router.get('/category/:id', async (req, res) => {
    id = req.params.id;
    console.log(id);
    const result = await categoryModel.findById(id).exec();
    res.send(result);
});


router.post('/update/:id', async (req, res) => {
    id = req.params.id;
    var post = req.body;
    var objectUpdate = {
        $set : post
    };
    const result = await categoryModel.findByIdAndUpdate(id,objectUpdate).exec();
   
    res.send(result);
});


router.post('/delete/:id', async (req, res) => {
    id = req.params.id;
   
    const result = await categoryModel.findByIdAndRemove({_id : id}).exec();
   
    res.send(result);
});


module.exports = router ;