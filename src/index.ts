import {scrapeWebPage} from "./scraper";

const url: string = "https://www.scrapethissite.com/pages/";

scrapeWebPage(url).then((result) => {
    if (result) {
        console.log('Page Title:', result.title);
        console.log('Description:', result.description);
    } else {
        console.log('Failed to scrape the webpage.');
    }
})