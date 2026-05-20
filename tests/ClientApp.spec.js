const { test, expect } = require("@playwright/test");
const { AssertionError } = require("node:assert/strict");



test('Browser Context-Validating Error login', async ({ page }) => {
    const productName = "iphone 13 pro";
    const products = page.locator(".card-body");
    const email = "RY@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Password123");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");// used to wait till all product is load on page OR
    await page.locator(".card-body b").first().waitFor();
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title)
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        //itarate the list of product and select the exact product name which required
        if (await products.nth(i).locator("b").textContent() == productName) {
            //add to cart
            await products.nth(i).locator("text = Add To Cart").click();
            break;
        }


    }
    await page.locator('[routerlink*="cart"]').click();
    page.locator("div li").first().waitFor()
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text == " India") {
            await dropdown.locator("button").nth(i).click();
            break;


        }

    }
    // put assertion for email ID 
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    // Dynamically find the order from order History page using playwright 
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();//this used to wait until whole order history table is not load  , once it load then next step 
    const rows = await page.locator("tbody tr");// find the row present in order history page
    for (let i = 0; i < await rows.count(); ++i) {
        //scaning all order count and match with expected one 
        const rowOrderId = await rows.nth(i).locator("th").textContent();// this step find the order id tha we expected 
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break

        }

    }
    const orderIdDetails = (await page.locator("div[class ='col-text -main']").textContent()).trim();
    console.log(orderIdDetails);
    //expect(orderIdDetails).toContain(orderId);
    expect(orderId.includes(orderIdDetails)).toBeTruthy();


    //await page.pause();

});
