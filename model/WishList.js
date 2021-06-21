const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    wishes: [{
        type: String,
        trim: true
    }]
})

const WishList = mongoose.model('WishList', wishListSchema)

module.exports = WishList