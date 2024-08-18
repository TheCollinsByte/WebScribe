import { Request, Response } from 'express';
import { scrapeAndInteract } from '../services/browserService';
import { Interaction } from '../models/scrapedData';

export const handleScrapeRequest = async (req: Request, res: Response) => {
    const { url, actions } = req.body;
    console.log(`Received scrape request for URL: ${url} with actions: ${JSON.stringify(actions)}`);
    try {
        if (!url || !actions) {
            return res.status(400).json({ error: 'URL and actions are required.' });
        }

        const result = await scrapeAndInteract(url, actions);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error in handleScrapeRequest: ${error}`);
        res.status(500).json({ error: error });
    }
};

export const getInteractions = async (req: Request, res: Response) => {
    try {
        const interactions = await Interaction.find().sort({ timestamp: -1 });
        res.status(200).json(interactions);
    } catch (error) {
        console.error(`Error retrieving interactions: ${error}`);
        res.status(500).json({ error: error });
    }
};
