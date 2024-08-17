import {scrapeWebPage} from "./scraper";
import * as mongoose from "mongoose";

const mongoUri = 'mongodb://webscribe:password@localhost:27017/webscraper?authSource=admin';

const url: string = "https://www.scrapethissite.com/pages/";

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    })

scrapeWebPage(url).then(() => {
    mongoose.connection.close();
})