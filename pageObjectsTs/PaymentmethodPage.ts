import{test,expect,Locator, Page}from '@playwright/test';
export class PaymentmethodPage {
    selectCountry:Locator;
    filterCountry:Locator;
    emailId:Locator;
    submit:Locator;
    orderConfirmationText:Locator;
    orderId:Locator;
    orderButtonClick:Locator;

    constructor(page:Page) {
        this.selectCountry = page.locator("[placeholder*='Country']");
        this.filterCountry = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderButtonClick = page.locator("button[routerlink*='myorders']");

    }
    async paymentDetailPage() {

        await this.selectCountry.pressSequentially("ind", { delay: 150 });

        const dropdown = this.filterCountry;
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text == " India") {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }
    async VerifyEmailId(username:string) {
         return await this.emailId.textContent();
    }

    async SubmitAndGetOrderId() {
        await this.submit.click();
        
        return await this.orderId.textContent();
    }
    async NavigateToorderHistoryPage (){
        await  this.orderButtonClick.click();
    }
}
module.exports = { PaymentmethodPage }