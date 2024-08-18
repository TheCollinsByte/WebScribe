import {Router} from "express";
import {getInteractions, handleScrapeRequest} from '../controllers/scraperController';

const router = Router();

// handle scraping and interaction
router.post('/scrape', handleScrapeRequest);

// get all stored interactions
router.get('/interactions', getInteractions);

export default router;