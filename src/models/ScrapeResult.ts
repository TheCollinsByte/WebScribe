import * as mongoose from "mongoose";
import {Document, Schema} from "mongoose";

interface IScrapeResult extends Document{
    url: string;
    title: string;
    description: string;
}

const ScrapeResultSchema: Schema = new Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
})

export const ScrapeResult = mongoose.model<IScrapeResult>('ScrapeResult', ScrapeResultSchema)