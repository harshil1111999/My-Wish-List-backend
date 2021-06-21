const express = require('express')
// const WishList = require('../model/WishList')
const db = require('../config/database')
const router = express.Router()
const {ObjectID} = require('mongodb')

router.get('/show-all', async (req, res) => {
    const WishList = db.getDB().collection('wishlists')
    try {
        const cursor = await WishList.find()
        const data = await cursor.toArray()
        res.json(data)
    } catch(err) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
    // WishList.find()
    //     .then(data => {
    //         res.json(data)
    //     })
    //     .catch(err => {
    //         res.status(400).json({
    //             success: false,
    //             message: 'Something went wrong'
    //         })
    //     })
})

router.get('/fetch-wishlist/:id', async (req, res) => {
    const WishList = db.getDB().collection('wishlists')
    try {
        const data = await WishList.findOne({_id : ObjectID(req.params.id)})
        res.json(data)
    } catch(err) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
        
    // .then(data => {
        //     res.json(data)
        // })
        // .catch(err => {
            // res.status(400).json({
            //     success: false,
            //     message: 'Something went wrong'
            // })
        // })
})

router.post('/add-wishList', async (req, res) => {
    const WishList = db.getDB().collection('wishlists')
    // console.log(req.body)
    try {
        const data = await WishList.insertMany(req.body)
        console.log(data)
        res.send('done')
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: err
        })
    }
    // WishList.collection.insertMany(req.body)
    //     .then(data => {
    //         console.log(data)
    //         res.send('done')
    //     })
    //     .catch(err => {
            // res.status(500).json({
            //     success: false,
            //     error: err
            // })
    //     })
})

router.put('/add-wishList/:id', async (req, res) => {
    const WishList = db.getDB().collection('wishlists')
    
    try {
        const data = await WishList.findOneAndUpdate(
            {_id : ObjectID(req.params.id)},
            {$set : {
                name: req.body.name,
                wishes: req.body.wishes
            }})

        console.log(data)
        res.json('Updated successfully')
    } catch(err) {
        res.status(500).json({
            success: false,
            error: err
        })
    }
    // WishList.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
    //     .then(data => {
    //         res.json(data)
    //     })
    //     .catch(err => {
            // res.status(500).json({
            //     success: false,
            //     error: err
            // })
    //     })
})

router.delete('/delete-wish/:id', async (req, res) => {
    const WishList = db.getDB().collection('wishlists')

    try {
        const data = await WishList.deleteOne({_id : ObjectID(req.params.id)})
        console.log(data)
        res.json('Deleted successfully')
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: err
        })
    }
        // .then(data => {
        //     res.json(data)
        // })
        // .catch(err => {
            // res.status(500).json({
            //     success: false,
            //     error: err
            // })
        // })
})

module.exports = router