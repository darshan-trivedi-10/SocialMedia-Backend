import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv';
const cors1 = require('cors');

// Routers
import AuthRoute from "./Routes/AuthRoute.js";
import userRoute from './Routes/userRouter.js'
import postRouter from './Routes/postRouter.js'
import uploadRouter from './Routes/uploadRouter.js'



const app = express();
var port = process.env.PORT || 5000;


// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// });

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(express.static('public'));
app.use('/images', express.static('images'));
// app.use(express.static('public/build'));
app.use(cors1());
// app.use(cors({
//     origin: 'https://neon-tarsier-c71778.netlify.app/'
// }));

dotenv.config();

mongoose.connect('mongodb+srv://darshan:tDj0mhMWHdRkggKR@cluster0.knu7pzn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(port, '0.0.0.0', () => {
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