import{test,expect,Locator, Page}from '@playwright/test';
export class LoginPage {
    page:Page;
    signInbutton :Locator
    userName:Locator
    passWord:Locator
    constructor(page:Page) 
    {
        this.page = page ;
        this.signInbutton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.passWord = page.locator("#userPassword");
    }
    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client")


    }
    async valdiLogin(username:string,password:string) {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState("networkidle");
    }

}
module.exports = {LoginPage};