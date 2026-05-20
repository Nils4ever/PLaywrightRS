const {test,expect} = require("@playwright/test");
//test.describe.configure({mode:'parallel'});

test("@Web Popup validation", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //page nevigation 
    // await page.goBack();
    // await page.goForward();

    // How to handle hidden element 
    await expect (page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // hownto handle alert Popup/dailog
   // await page.pause();
    page.on('dialog',dialog => dialog.accept());
    await page.locator("#alertbtn").click();

    //how to handle  hover
    await page.locator("#mousehover").hover();

    // how to handle  Frame
    const frame = page.frameLocator("#courses-iframe");
    frame.locator ("li a[href*='lifetime-access']:visible").click();
    const textCheck =await frame.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
    
    
});
test("ScrenShot & Visual Comaprision", async ({page}) => {
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect (page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'PartialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});
    await page.locator
    await expect(page.locator("#displayed-text")).toBeHidden();

});
// test.only ('visual',async({page})=>
// {
// await page.goto("https://www.google.com/");
// expect (await page.screenshot()).toMatchSnapshot('landingPage.png');


// })
