const { When, Then, Given } = require('@cucumber/cucumber');
const { PageObjectManager } = require('../../pageobjects/PageObjectManager');
const { expect } = require("@playwright/test");
//const {playwright} = require("@playwright/test");
const { chromium } = require('playwright');
const playwright = require('playwright');



Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    this.username = username;
    console.log("step startted");
    const products = this.page.locator(".card-body");
    const loginPage = this.pageObjectManager.getLoginPage();
    await loginPage.goTo();
    console.log(loginPage);
    await loginPage.valdiLogin(username, password);
});

When("Add {string} to cart", async function (productName) {

    const dashboardPage = this.pageObjectManager.getDashboardPage();
    await dashboardPage.searchProdcutAddCart(productName);
    await dashboardPage.navigateTocart();

});
Then("verify {string} is display in to the cart", async function (productName) {
    const mycart = this.pageObjectManager.getMycartPage();
    await mycart.isProductVisible();
    await mycart.navigateToPaymentPage();
});

When("Enter vaild details and place the Order", async function () {
    const paymentmethodPage = this.pageObjectManager.getPaymentMethodPage();
    await paymentmethodPage.paymentDetailPage();
    expect(await paymentmethodPage.VerifyEmailId()).toContain(this.username);
    this.orderId = await paymentmethodPage.SubmitAndGetOrderId();
    console.log(this.orderId);
    paymentmethodPage.NavigateToorderHistoryPage();

});

Then("verify the order is present in the OrderHistory", async function () {
    const orderHistoryPage = this.pageObjectManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

});
Given("a login to loginPractice application with {string} and {string}", { timeout: 100 * 1000 }, async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");// launching url 
    console.log(await this.page.title())

    await this.page.locator('#username').fill(username );
    await this.page.locator("[type='password']").fill(password);
    await this.page.locator('#signInBtn').click();
});

Then("Verify error message is displayed", async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect")
});