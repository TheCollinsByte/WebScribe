import express from 'express';
import { scrapeAndInteract } from '../controllers/scraperController';

const router = express.Router();

router.post('/scrape', scrapeAndInteract);

export default router;