// require('dotenv').config({path : './env'})

import dotenv from 'dotenv'
dotenv.config({
    path : './env'
})

import express from 'express'
const app = express();


import connectDB from './db/index.js';


const port = process.env.PORT || 3000 

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server started at port : ${port}`)
    })
})
.catch((error) => {
    console.log('MongoDB connection failed !!! as : ', error)
}) 











/*

// this approach is not considered professional as it populates index.js file.

import express from 'express'

const app = express()

;
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on('error', (error) => {
            console.log('Error : ', error)
            throw error

        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port : ${process.env.PORT}`)
        })

    } catch (error) {
        console.error('Error : ', error)
        throw error
    }
} )()

*/
   