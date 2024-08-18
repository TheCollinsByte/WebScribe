import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import * as mongoose from "mongoose";
import scraperRouter from './routes/scraper';

const mongoUri = 'mongodb://webscribe:password@localhost:27017/webscraper?authSource=admin';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: 'http://localhost:1234',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(`MongoDB Connection error: ${err.message}`))

app.use('/api/browser', scraperRouter);

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
});