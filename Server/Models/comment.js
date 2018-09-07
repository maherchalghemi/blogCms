const mongoose = require('mongoose');
const schema = mongoose.Schema ;

let comment = new schema ({

    text : {
        type : String
    },
    date : {
        type : Date
    },
    author : {type : schema.ObjectId, ref:'users'},
    article : {type : schema.ObjectId, ref:'articles'}

}); 

module.exports = comment ;