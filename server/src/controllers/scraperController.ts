import { Request, Response } from 'express';
import { simulateBrowserInteractions } from '../services/browserService';
import ScrapedData from '../models/scrapedData';

export const scrapeAndInteract = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        const scrapedData = await simulateBrowserInteractions(url);

        const savedData = await ScrapedData.create({
            url,
            content: scrapedData,
            timestamp: new Date(),
        });

        res.json(savedData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};