/*
SOmetime due to jest issue the test fails with error like just did not invoked 5000ms and some other
random error.
Fix: Run the test multiple time. Try to close all other application to give jest enough thread to run..
*/

const puppeteer = require('puppeteer');

// test('Adds two numbers', ()=>{
//     const sum = 1 + 2;
//     expect(sum).toEqual(3);
// });


var browser, page;
//Will run before each test
beforeEach(async ()=>{
    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    // Visiting the blogpost page
    await page.goto('localhost:3000');
})

//Will run after each test
afterEach(async ()=>{
    // await browser.close();
});


test('The header has the correct text.', async ()=>{
    //Extacting the blog title
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
});



test('Clicking login starts OAuth flow', async ()=>{
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch('/accounts\.google\.com/'); //\ > Escape character
});


test.only("when sign in shows the logout button", async ()=>{
    // Take existing usre id from db
    const id = '6459dc8d06fee61854249f5f'; //copied from mongo comapss

    // Generate fake session obj
    const Buffer = require('safe-buffer').Buffer;
    const sessionObject = {
        passport: {
            user: id
        }
    };

    const sessionString = Buffer.from(
        JSON.stringify(sessionObject).toString('base64'))
    
    // Generate the session sig with keygrip
    const Keygrip = require('keygrip');
    const keys = require('../config/keys')
    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign('session='+sessionString);
    // console.log(sessionString);
    // console.log(sig);

    //set the cookie
    await page.setCookie({ name: 'session', value: sessionString});
    await page.setCookie({ name: 'session.sig', value: sig});
    // Refresh the page to load above 
    await page.goto('localhost:3000');
});