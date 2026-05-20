import { LoginPage } from'./LoginPage';
import { DashboardPage } from './DashboardPage';
import { Mycart } from './Mycart';
import { PaymentmethodPage } from'./PaymentmethodPage';
import { OrderHistoryPage } from './OrderHistoryPage';
import { Page } from '@playwright/test';

export class PageObjectManager {
    page:Page
    loginPage:LoginPage;
    dashboardPage:DashboardPage;
    mycart:Mycart;
    paymentmethodPage:PaymentmethodPage;
    orderHistoryPage:OrderHistoryPage
    constructor(page:Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.mycart = new Mycart(this.page);
        this.paymentmethodPage = new PaymentmethodPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page)
    }

    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getMycartPage() {
        return this.mycart;
    }
    getPaymentMethodPage() {
        return this.paymentmethodPage;
    }
    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }

}
module.exports = { PageObjectManager };
