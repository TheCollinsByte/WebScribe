import axios from "axios";
import {ScrapeResult} from "./types";
import { ScrapeResult as ScrapeResultModel } from './models/ScrapeResult';
import * as cheerio from "cheerio";


export async function scrapeWebPage(url: string): Promise<void> {
    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('head > title').text();
        const description = $('meta[name=description]').attr('content') || '';

        const scrapeResult = new ScrapeResultModel({url, title, description})
        await scrapeResult.save();

        console.log(`Saved: ${url}`);
    } catch (error) {
        console.error(`Error scraping ${url}:`, error);
    }
}