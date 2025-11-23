import express from 'express'
import dotenv  from "dotenv"
import mongoose from 'mongoose';
import userRouter from './router/userRouter.js';
import productRoutes from './router/productRoutes.js';
import cors from 'cors'
dotenv.config()

const app = express()

// middle ware
app.use(express.json()); 
app.use(cors())

// Routing
app.use('/user',  userRouter)
app.use('/product', productRoutes)

// Mongodb connection
mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// App listening 
app.listen('5000', () => {
    console.log("Server is running on this port no 5000")
})