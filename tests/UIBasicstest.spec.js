const { test, expect } = require("@playwright/test");
const { clear } = require("node:console");

test("First Playwright test", async ({ browser }) => {


    // lounching new browser 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");// launching url 
    console.log(await page.title());// gives the page title "LoginPage Practise | Rahul Shetty Academy"

    //making variable for all field on login page with their css locator 
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const cardTitle = page.locator(".card-body a");

    // used only variable and performe action 
    await userName.fill("");
    await userName.fill("rahulshetty");
    await password.fill("");
    await password.fill("learning");
    await signIn.click();

    // Extract error text "Incorrect username/password" from login page for invalid username and password 

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")

    // fill correct data 
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(1).textContent());// if the all element having same locator then used the "nth() method and pass the index inside "
    // If there is alot of product on pDP and need to get all for that used following method 
    console.log(await cardTitle.allTextContents());
});

test("@ Web UI Controls", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");// launching url 
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const dropdown = await page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    console.log(await dropdown.selectOption("consult"));
    //await page.pause();
    await page.locator(".checkmark").last().click();
    await page.locator("#okayBtn").click();
    // await page.pause();
    console.log(await page.locator(".checkmark").last().isChecked());
    //assertion 
    await expect(page.locator(".checkmark").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

});
//Handling child windows and tabs with palywright by switching browser contex

test("Child Window Handling", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    // to performed paralel  execution or stepwise execution promise. all  is used 
    const [newPage] = await Promise.all([context.waitForEvent('page'),//listen for any new page pending ,rejected, fulfiled 
    documentLink.click()])//new page is opened
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator('#username').fill(domain);
    await page.pause();
    console.log(await page.locator('#username').inputValue());




});
