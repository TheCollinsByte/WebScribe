import {Schema, model} from "mongoose";

const interactionSchema = new Schema({
    url: { type: String, required: true },
    actions: { type: Array, required: true },
    results: { type: Array, required: true },
    scrapedContent: { type: String },
    timestamp: { type: Date, default: Date.now }
});

export const Interaction = model('Interaction', interactionSchema);