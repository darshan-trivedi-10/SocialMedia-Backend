import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv';

// Routers
import AuthRoute from "./Routes/AuthRoute.js";
import userRoute from './Routes/userRouter.js'
import postRouter from './Routes/postRouter.js'
import uploadRouter from '../server/Routes/uploadRouter.js'


const app = express();
const port=process.env.PORT || 5000;

// to serve images for public

app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(express.static('public/build'));

dotenv.config();


mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(port, () => {
        console.log('listening')
    })
}).catch((error) => {
    console.log(error.message)
})


// Usage of Route
app.use('/auth', AuthRoute);
app.use('/user', userRoute);
app.use('/post', postRouter);
app.use('/upload', uploadRouter);