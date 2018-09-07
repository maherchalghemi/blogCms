const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let article = new Schema ({
    name : {
        type : String
    },

    url : {
        type : String
    },

    description :{
        type : String
    },

    like :[{type : Schema.ObjectId, ref:'users'}],
  

    date : {
        type : Date
        
    },
    author : {type : Schema.ObjectId, ref:'users'},
    category : {type : Schema.ObjectId, ref: 'categorie'},
    comment:[{type: Schema.ObjectId, ref:'comments'}]
});


module.exports = article ;