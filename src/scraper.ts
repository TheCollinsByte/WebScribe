import axios from "axios";
import {ScrapeResult} from "./types";
import cheerio from "cheerio";


export async function scrapeWebPage(url: string): Promise<ScrapeResult | null> {
    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('head > title').text();
        const description = $('meta[name=description]').attr('content') || '';

        return {title, description};
    } catch (error) {
        console.error(`Error scraping ${url}:`, error);
        return null;
    }
}