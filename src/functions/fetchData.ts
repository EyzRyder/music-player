import * as puppeteer from 'puppeteer';
// import * as puppeteer from 'puppeteer-core';


export async function fetchPageData(url: string): Promise<string> {

    const browser = await puppeteer.launch(
    //     {
    //     headless: false,
    // }
    );

    const page = await browser.newPage();
    try {
        await page.goto(url, {
            waitUntil: 'networkidle2',
        });

        // await page.waitForTimeout(5000);

        const pageData: string = await page.evaluate(() => {
            return document.documentElement.innerHTML
        });
        return pageData
    } catch (e: any) {
        console.log(e);
        const pageData = e.toString();
        return pageData;
    } finally {
        await browser.close();
    }

    ;


}