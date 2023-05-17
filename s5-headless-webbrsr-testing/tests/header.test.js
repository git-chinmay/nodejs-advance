const puppeteer = require('puppeteer');

test('Adds two numbers', ()=>{
    const sum = 1 + 2;
    expect(sum).toEqual(3);
});

test('Launching a chromium browser', async ()=>{
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    // Visiting the blogpost page
    await page.goto('localhost:3000');

    //Extacting the blog title
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
});