import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()

//cors configuration
app.use(cors( {
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//set the limit of getting request data
//express take data as json
app.use(express.json({limit: "16kb"}))
//can get data from url encoded sam%20...
app.use(express.urlencoded( {
    extended: true,
    limit: "16kb"
}))

//store file folders, save assets in public folder
app.use(express.static("public"))

//get access and set user cookies
app.use(cookieParser())


export { app }