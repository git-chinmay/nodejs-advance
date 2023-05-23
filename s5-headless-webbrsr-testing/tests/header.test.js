/*
-> Sometime due to jest issue the test fails with error like just did not invoked 5000ms and some other
random error.
Fix: Run the test multiple time. Try to close all other application to give jest enough thread to run..

-> Use test.only() to just run a specific test case in suite
*/

const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');

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
    await browser.close();
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


test("when sign in shows the logout button", async ()=>{
    
    const user = await userFactory(); // Its returning a promise
    const {session, sig} = sessionFactory(user);
    // console.log(sessionString);
    // console.log(sig);

    //set the cookie
    await page.setCookie({ name: 'session', value: session});
    await page.setCookie({ name: 'session.sig', value: sig});
    // Refresh the page to load above 
    await page.goto('localhost:3000');

    //wait for the page to oad properly
    await page.waitFor('a[href="/auth/logout"]');

    // Doing unit testing
    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    expect(text).toEqual('Logout');
});