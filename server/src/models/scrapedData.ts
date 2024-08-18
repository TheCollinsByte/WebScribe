import * as mongoose from "mongoose";

const scrapedDataSchema = new mongoose.Schema({
    url: String,
    content: Object,
    timestamp: Date,
});

export default mongoose.model('ScrapedData', scrapedDataSchema);