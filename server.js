const express = require('express')
const cors = require('cors')
const router = require('./routes')

// for to connect app with database
const db = require('./config/database')

// for to access variables from .env file
require('dotenv').config()

const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// routes
app.use(router)

//error handling
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})

db.connect((err) => {
    if(err) {
        console.log('Unable to connect to database')
        process.exit(1)
    } else {
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}`)
        })
    }
})