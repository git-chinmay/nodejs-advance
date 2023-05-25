const puppeteer = require('puppeteer');

class CustomPage {
    static async build(){
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        const cutsompage = new CustomPage(page)

        return new Proxy(CustomPage, {
            get: function(target, property){
                return target[property]  || browser[property] || page[property]
            }
        })
    }

    constructor(page){
        this.page = page
    }


}

module.exports = CustomPage;

