// AIM IS TO REPLACE LOGIN PORTION WITH A LOGIN METHOD //

//// APPROACH - 1 ////
/*
const Page = require('puppeteer/lib/page');
Page.prototype.login = async () => {
    const user = await userFactory(); // Its returning a promise
    const {session, sig} = sessionFactory(user);
    //set the cookie
    await this.setCookie({ name: 'session', value: session});
    await this.setCookie({ name: 'session.sig', value: sig});
    // Refresh the page to load above 
    await this.goto('localhost:3000');
    //wait for the page to oad properly
    await this.waitFor('a[href="/auth/logout"]');
}*/


//// APPROACH - 2 ////
/*
class Page {
    goto() {console.log("I am going to another page");}
    setCookie() {console.log("I am setting the cookie");}  
  }
  
  class CustomPage{
    constructor(page){
      this.page = page;
    }
    login(){
      this.page.goto();
      this.page.setCookie();
    }
  }
  
  const page = new Page();
  const custompage = new CustomPage(page);
  custompage.login();*/

/*
To make individual call we have to do
custompage.this.goto();
custompage.this.setCookie();

But we dont want to use .this each time.But
How can we convert it to custompage.goto();

Soln1- we can explicitily define a goto() method inside cutsompage class
goto(){
    this.page.goto();
}

But we have to define same for each metod and a lot of code repetation.

Soln2- Using "Proxies" gloabl function (Its only avlable post ES 2015)
*/

//// PROXY EXAMPLE ////
/*
class Greetings {
  english() {return "Hello"}
  spanish() {return "Hola"}
}

class MoreGreetings {
  german() {return "Hallo"}
  french() {return "Bonzure"}
}

const greetings = new Greetings();
const moreGreetings = new MoreGreetings();

 // ProXy is a Global function no require needed
const allGreetings = new Proxy(moreGreetings, {
    // target = moreGreetings
  get: function(target, property){
    console.log(property); // Output = "french"
    return target[property] || greetings[property]; // Output = french() {return "Bonzure";}
  }
});

console.log(allGreetings.french) // french() {return "Bonzure";}
console.log(allGreetings.french()) // Bonzure
console.log(allGreetings.english()) // Hello
*/


//// PROXY IMPLEMENTAION TO PAGE EAMPLE ////
// class Page {
//   goto() {console.log("I am going to another page");}
//   setCookie() {console.log("I am setting the cookie");}  
// }

// class CustomPage{
//   static build(){
//     const page = new Page();
//     const custompage = new CustomPage(page);
//     const superPage = new Proxy(custompage, {
//         get: function(target, property){
//               return target[property] || page[property];
//         }
//     });
    
//     return superPage;
//   }
//   constructor(page){
//     this.page = page;
//   }
//   login(){
//     this.page.goto();
//     this.page.setCookie();
//   }
// }

// const superpage = CustomPage.build();
// superpage.goto();
// superpage.setCookie();
// superpage.login();



