const Page = require('./helpers/page');

let page;
beforeEach(async ()=>{
    page = await Page.build();
    await page.goto('localhost:3000')
});

afterEach(async ()=>{
    page.close();
})

// test("when logged in, can see blog create form", async ()=>{
//     await page.login();
//     await page.click('a.btn-floating');
//     const label = await page.getContentsOf('form label');
//     expect(lable).toEqual('Blog Title');
// });

describe("when logged in", async ()=>{
    // This beforeEach will only run for tests defined inside the this describe
    beforeEach(async ()=>{
        await page.login();
        await page.click('a.btn-floating');
    });

    test("can see blog create form", async ()=>{
        const label = await page.getContentsOf('form label');
        expect(lable).toEqual('Blog Title');
    });

    describe("And using valid inputs", async ()=>{
        // For entering valid input
        beforeEach(async ()=>{
            await page.type('.title input', 'My test title');
            await page.type('.content input', 'My test content');
            await page.click('form button'); //submit the form
        });


        test("Submitting takes user to review screen", async ()=>{
            const text = await page.getContentsOf('h5');
            expect(text).toEqual('Please confirm your entries');
        });

        test("Submitting then adds blog to inde page", async ()=>{
            await page.click('button.green');
            await page.waitFor('.card'); //wait for submit button data to send to server

            const title = await page.getContentsOf('.card-title');
            const content = await page.getContentsOf('p');

            expect(title).toEqual('My test title');
            expect(content).toEqual('My test content');
        });
    });

    describe("And using invalid inputs", async ()=>{
        // Usually top beaforeEach should run but we need to submit without input
        // so new beforeeach
        beforeEach(async ()=>{
            await page.click('form button');
        });

        test("the form shows an error message", async ()=>{
            const titleError = await page.getContentsOf('.title .red-text');
            const contentError = await page.getContentsOf('.content .red-text');
            expect(titleError).toEqual("You must provide a value");
            expect(contentError).toEqual("You must provide a value");
        });
    })
});