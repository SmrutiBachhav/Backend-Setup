// require('dotenv').config({path: './env'})
// import 'dotenv/config' 
import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/index.js";

const app = express()

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`SERVER is running at PORT: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGODB connection failed!", err);
})


















/* 1st approach
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import express from "express"
const app = express()

// function connectDB() {

// }

// connectDB
//or
//immediately execute function
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch(error) {
        console.error("ERROR", error)
        throw err
    }
})()
    */