const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require('playwright');
const { PageObjectManager } = require('../../pageobjects/PageObjectManager');
const path = require("node:path");




Before(async function () {
    const browser = await playwright.chromium.launch({headless:false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pageObjectManager = new PageObjectManager(this.page);

});


After(function () {
    console.log(" ending statement Thank you  ")
})