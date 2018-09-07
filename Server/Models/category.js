const mongoose = require('mongoose');
const schema = mongoose.Schema;

let category = new schema ({

    type: {
        type : String
    },
    articles:[{type: schema.ObjectId, ref:'articles'}]
});

module.exports = category ;
