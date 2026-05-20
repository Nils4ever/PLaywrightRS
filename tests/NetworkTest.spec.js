const { test, expect, request } = require("@playwright/test");
const {APiUtils}=require('../utils/APiUtils');


const loginPayLoad = { userEmail: "RY@gmail.com", userPassword: "Password123" }
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }
// let token;
// let orderID;
let response;

test.beforeAll(async () => {
    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayLoad);
     response = await apiUtils.createOrder(orderPayLoad)


}),

test.beforeEach(() => {



});


test('Place the order', async ({ page }) => {


    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69d5fc28f86ba51a6551765c") 

    


    //const email = "RY@gmail.com";
    //const productName = "iphone 13 pro";
    // Dynamically find the order from order History page using playwright 
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();//this used to wait until whole order history table is not load  , once it load then next step 
    const rows = await page.locator("tbody tr");// find the row present in order history page

    
});
