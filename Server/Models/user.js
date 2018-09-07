const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = new Schema ({
    name : {
        type : String ,
        max : 100
    },
    lastname : {
        type : String ,
        max : 100
    },

    url : {
        type : String
    },

    email : {
        type : String ,
        max : 100,
        unique : true
    },
    password : {
        type : String ,
        max : 100
    },

    role : {
        type : String
    },
    articles:[{type: Schema.ObjectId, ref:'articles'}],
    comment:[{type: Schema.ObjectId, ref:'comments'}]

});

module.exports = user ;