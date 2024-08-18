import puppeteer from 'puppeteer';

export const simulateBrowserInteractions = async (url: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });

    // Example: Click a button with id 'submit-button'
    await page.click('#submit-button');

    // Example: Fill out a form
    await page.type('#username', 'testuser');
    await page.type('#password', 'password123');
    await page.click('#login-button');

    // Wait for navigation
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Extract data
    const pageTitle = await page.title();
    const pageContent = await page.content();

    await browser.close();

    return {
        title: pageTitle,
        content: pageContent,
    };
};