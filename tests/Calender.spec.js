const { test, expect } = require("@playwright/test");



test("CalenderValidation", async ({ page }) => {
    //page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const monthNumber = "11"
    const dateNumber = "19"
    const yearNumber = "2027"
    const expectedList = [monthNumber,dateNumber,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText--from").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(yearNumber).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text() ='" + dateNumber + "']").click();
    const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }




});