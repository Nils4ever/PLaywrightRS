import{test,expect,Locator, Page}from '@playwright/test';

export class Mycart {
    page : Page ;
    cartSelection :Locator;
    checkoutButton:Locator;

    constructor(page:Page){
        this.page =page;
         this.cartSelection = page.locator("div li");
         this.checkoutButton = page.locator("text=Checkout");

    }
    async isProductVisible (productName:String){
        await this.cartSelection.first().waitFor();
       return await this.page.locator(`h3:has-text("${productName}")`).isVisible();
           
    }
    async navigateToPaymentPage(){
        await this.checkoutButton.click();

    } 
}
module.exports ={Mycart};