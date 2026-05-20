class DashboardPage {
    constructor(page)
    {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator('[routerlink*="cart"]');

    }
     async searchProdcutAddCart(productName){
        
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
