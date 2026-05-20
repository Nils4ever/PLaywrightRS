const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { Mycart } = require('./Mycart');
const { PaymentmethodPage } = require('./PaymentmethodPage');
const { OrderHistoryPage } = require('./OrderHistoryPage');

class PageObjectManager {
    constructor(page) {
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
