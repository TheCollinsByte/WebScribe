import express from "express";
import * as mongoose from "mongoose";
import scraperRouter from './routes/scraper';

const mongoUri = 'mongodb://webscribe:password@localhost:27017/webscraper?authSource=admin';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

mongoose.connect(mongoUri)

app.use('/api', scraperRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});