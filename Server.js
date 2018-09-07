var express = require('express');
const bodyParser = require('body-parser')
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
const auth = require('./Server/Routing/auth');
app.use('/auth', auth);

const user = require('./Server/Routing/user');
app.use('/user', user);

const article = require('./Server/Routing/article');
app.use('/article', article);


const comment = require('./Server/Routing/comment');
app.use('/comment', comment);

const category = require('./Server/Routing/category');
app.use('/category', category);

app.get("/uploads/:filename", (req,res)=>{
    res.sendFile(__dirname + "/uploads/"+req.params.filename)
})

app.use(express.static(__dirname + "/dist/blogmean/assets"))
app.get('**', (req, res) => res.sendFile(__dirname + "/dist/blogmean/index.html"))

app.listen(3002, err => { console.log("server listening on port 3002") });
