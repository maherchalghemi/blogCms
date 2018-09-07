const router = require('express').Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require("path");
const User = require("../Models/user");

mongoose.connect('mongodb://localhost:27017/blogdb');

const userModel = mongoose.model('users', User);

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
    const result = await userModel.find().populate({path:'articles'}).exec();
    res.send(result);
});

router.get('/alluser', async (req, res) => {
    var query = { role: "user" };
    const result = await userModel.find(query).populate({path:'articles'}).exec();
    res.send(result);
});

router.get('/alladmin', async (req, res) => {
    var query = { role: "admin" };
    const result = await userModel.find(query).populate({path:'articles'}).exec();
    res.send(result);
});

router.post('/add', async (req, res) => {
    var post = req.body;
    const result = await userModel.create(post);
    res.send(result);
});

router.get('/user/:id', async (req, res) => {
    id = req.params.id;
    console.log(id);
    const result = await userModel.findById(id).populate({path:'articles'}).exec();
    res.send(result);
});


router.post('/update/:id', async (req, res) => {
    id = req.params.id;
    var post = req.body;
    var objectUpdate = {
        $set : post
    };
    const result = await userModel.findByIdAndUpdate(id,objectUpdate).exec();
   
    res.send(result);
});


router.post('/delete/:id', async (req, res) => {
    id = req.params.id;
   
    const result = await userModel.findByIdAndRemove({_id : id}).exec();
   
    res.send(result);
});



module.exports = router ;