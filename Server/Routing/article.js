const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../Models/user');
const multer = require('multer');
const path = require("path");
const Article = require("../Models/article");
mongoose.connect('mongodb://localhost:27017/blogdb');

const articleModel = mongoose.model('articles', Article);
const userModel = mongoose.model('users',User)


const DIR = './uploads';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});


router.post('/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
            success: true,
            path : req.file.filename          
        })
      }
});




router.get('/all', async (req, res) => {
    mydate = {date : -1}
    const result = await articleModel.find().populate({path:'author'}).sort(mydate).populate({path:'category'}).exec();
 
    res.send(result);
});

router.get('/category/:id', async (req, res) => {
    id = req.params.id ;
    cat = {category : id}
    const result = await articleModel.find(cat).populate({path:'author'}).populate({path:'category'}).exec();
 
    res.send(result);
});

router.get('/lastart', async (req, res) => {
    mydate = {date : -1}
    const result = await articleModel.find().sort(mydate).limit(3).populate({path:'author'}).populate({path:'category'}).exec();
 
    res.send(result);
});

router.get('/article/:id', async (req, res) => {
    id = req.params.id;
    console.log(id);
    const result = await articleModel.findById(id).populate({path:'author'}).populate({path:'category'}).populate({path:'comment',populate:{path : 'author' , model : 'users'}}).exec();
    res.send(result);
});

router.post("/updatecomment/:id", async (req,res)=>{
    var id = req.params.id ;
    comt = req.body ;
    const result = await articleModel.findOneAndUpdate({_id: id},{ $addToSet: {comment: req.body.comment}}).exec();
    res.send(req.body);
});

router.post("/like/:id", async (req,res)=>{
    var id = req.params.id ;
    
    const result = await articleModel.findOneAndUpdate({_id: id},{ $addToSet: {like: req.body.like}}).exec();
    res.send(req.body);
});

router.post("/dislike/:id/:i", async (req,res)=>{
    var id = req.params.id;
    var i = req.params.i;
    const result = await articleModel.findOneAndUpdate({_id: id}, {$pull: {like: i}}).exec();
    res.send(result);
});


router.post('/add', async (req, res) => {
    var post = req.body;
    console.log(post);

    const result = await articleModel.create(post);
    

    var id = result.author ;
    await userModel.findOneAndUpdate({_id: id},{ $addToSet: {articles: result._id}}).exec();
   res.send(result);
});

router.post('/update/:id', async (req, res) => {
    id = req.params.id;
    var post = req.body;
    var objectUpdate = {
        $set : post
    };
    const result = await articleModel.findByIdAndUpdate(id,objectUpdate).exec();
   
    res.send(result);
});

router.post('/delete/:id' , async (req , res) => {
    id = req.params.id ;
    console.log(id);
    const result = await articleModel.findOneAndRemove({_id : id}).exec();
    res.send(result);
})


module.exports = router ;