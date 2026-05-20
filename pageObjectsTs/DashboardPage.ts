import{test,expect,Locator, Page}from '@playwright/test';
export class DashboardPage {
   
    products:Locator;
    productsText:Locator;
    cart:Locator;
    

    constructor(page:Page)
    {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator('[routerlink*="cart"]');

    }
     async searchProdcutAddCart(productName:string){
        
        const title = await this.products.allTextContents();
            console.log(title)
            const count = await this.products.count();
            for (let i = 0; i < count; ++i) {
                //itarate the list of product and select the exact product name which required
                if (await this.products.nth(i).locator("b").textContent() == productName) {
                    //add to cart
                    await this.products.nth(i).locator("text = Add To Cart").click();
                    break;
                            }
            
     }
}
async navigateTocart()
{
await this.cart.click();
}
}
module.exports ={DashboardPage};
