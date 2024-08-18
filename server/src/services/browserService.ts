import puppeteer from 'puppeteer';
import { Interaction } from '../models/scrapedData';

export const scrapeAndInteract = async (url: string, actions: any[]) => {
    try {
        if (!Array.isArray(actions)) {
            throw new TypeError('actions must be an array.');
        }

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        console.log(`Navigating to ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2' });

        const results = [];

        for (const action of actions) {
            console.log(`Performing action: ${JSON.stringify(action)}`);
            try {
                if (action.type === 'click') {
                    await page.click(action.selector);
                    results.push({ action: 'click', selector: action.selector, status: 'success' });
                } else if (action.type === 'type') {
                    await page.type(action.selector, action.value);
                    results.push({ action: 'type', selector: action.selector, value: action.value, status: 'success' });
                } else {
                    throw new Error(`Unsupported action type: ${action.type}`);
                }
            } catch (err) {
                console.error(`Error performing action: ${err}`);
                results.push({ action: action.type, selector: action.selector, status: 'failed', error: err });
            }
        }

        const data = await page.content(); // Get the HTML content of the page
        await browser.close();

        // Save the interaction and scraped data to MongoDB
        const interaction = new Interaction({
            url,
            actions,
            results,
            scrapedContent: data,
        });

        await interaction.save();

        return { success: true, data, results };
    } catch (error) {
        console.error(`Error in scrapeAndInteract: ${error || error}`);
        throw new Error(`Scraping and interaction failed: ${error}`);
    }
};
