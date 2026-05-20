
import{ test, expect } from '@playwright/test'
import {customTest} from '../utilsTs/test-base';
const { AssertionError } = require("node:assert/strict");
import { PageObjectManager } from '../pageObjectsTs/PageObjectManager'
//Json --> string(by using json,stringify) -->js object(by using jeson.parse)
const dataset = JSON.parse(JSON.stringify(require("../utils/TestDataFile.json")));


for (const data of dataset){

test(`@Web Browser Context-Validating Error login for ${data.productName}`, async ({ page }) => {

    const products = page.locator(".card-body");
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.valdiLogin(data.username, data.password);

    const dashboardPage = pageObjectManager.getDashboardPage();
    await dashboardPage.searchProdcutAddCart(data.productName);
    await dashboardPage.navigateTocart();

    const mycart = pageObjectManager.getMycartPage();
    await mycart.isProductVisible(data.productName);
    await mycart.navigateToPaymentPage();

    const paymentmethodPage = pageObjectManager.getPaymentMethodPage();
    await paymentmethodPage.paymentDetailPage();
    expect(await paymentmethodPage.VerifyEmailId(data.username)).toContain(data.username)

    let orderId :any;
    orderId  = await paymentmethodPage.SubmitAndGetOrderId();
    console.log(orderId);
    paymentmethodPage.NavigateToorderHistoryPage();


    const orderHistoryPage = pageObjectManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();



});


}
customTest(`@Web Fixture By extend test`, async ({ page,testDataForOrder}) => {

   
    const pageObjectManager = new PageObjectManager(page);
     const products = page.locator(".card-body");
    const loginPage = pageObjectManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.valdiLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPage = pageObjectManager.getDashboardPage();
    await dashboardPage.searchProdcutAddCart(testDataForOrder.productName);
    await dashboardPage.navigateTocart();

    const mycart = pageObjectManager.getMycartPage();
    await mycart.isProductVisible(dataset);
    await mycart.navigateToPaymentPage();
});
