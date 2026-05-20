import { Page,Locator } from "@playwright/test";

export {};
let message : string = "Nilesh";
console.log(message);
let age : number  =20 ;
console.log(age);
let isactive :boolean = true;
let numberArray : number [] =[1,2,3] ;
let Data : any ="playwrite testing typescript etesting"
Data =42 ;
function add (a: number,b:number):number {
    return a+b;
}
add(3,5);

let user:{name: string ,age :Number , location : string } = {name:"bob",age:34 ,location:"Hydrabad"};
class Mycart {
    
    cartSelection :Locator ;
    page : Page;
    checkoutButton : Locator ;
    constructor(page:any){
        this.page =page;
         this.cartSelection = page.locator("div li");
         this.checkoutButton = page.locator("text=Checkout");

    }
    async isProductVisible (productName:string){
        await this.cartSelection.first().waitFor();
       return await this.page.locator(`h3:has-text("${productName}")`).isVisible();
           
    }
    async navigateToPaymentPage(){
        await this.checkoutButton.click();

    }
}