import {scrapeWebPage} from "./scraper";

const url = "https://google.com";

scrapeWebPage(url).then((result) => {
    if (result) {
        console.log('Page Title:', result.title);
        console.log('Description:', result.description);
    } else {
        console.log('Failed to scrape the webpage.');
    }
})