const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author_Name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    catID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        required : true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('post' , postSchema)