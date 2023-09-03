import  express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import bookRouter from './routes/booksRoute.js'
import cors from 'cors';

const app = express()

//Middleware for passing request body
app.use(express.json())

//Middleware for handling CROS POLICY
//Option 1: Allow all origins with Default of cors(*)
app.use(cors());

//Option 2: Allow custom origns
// app.use(
//     cors({
//         origin: 'http://locahost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )


app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to MERN Stack')
})

app.use('/books', bookRouter);

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`Sever is running on ${PORT} port`)
    })
})
.catch((err) => {
    console.log(err);
})