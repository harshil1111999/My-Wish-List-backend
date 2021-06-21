// const mongoose = require('mongoose')
// require('dotenv').config()

// mongoose.connect(process.env.DB_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// mongoose.connection.once('open', () => {
//     console.log('database is connected')
// })

const { MongoClient } = require('mongodb')
require('dotenv').config()

const client = new MongoClient(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const state = {
    db: null
}

const getDB = () => {
    return state.db
}

const connect = async (cb) => {
    try {
        await client.connect()
        state.db = client.db('data')
        console.log('Database is connected')
        cb()
    } catch(err) {
        cb(err)
    }
}

module.exports = {
    getDB,
    connect
}