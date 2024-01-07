import assert from "assert";

const { I } = inject();

Then("I click {string} admin link", (text: string) => {
    I.click(`//h4[contains(text(), '${text}')]`);
});

When("I'm looking for the right application and accept application", async () => {
    let hasMorePages: boolean | number = true;

    while (hasMorePages) {
        const isElementPresent = await I.grabNumberOfVisibleElements('.guide-card__name');
        if (isElementPresent > 0) {
            const elementText = await I.grabTextFrom('.guide-card__name');
            if (elementText === 'Ak-Maral') {
                I.click(`(//button[contains(text(), 'Accept')])[${isElementPresent}]`);
                break;
            }
        }
        hasMorePages = await I.grabNumberOfVisibleElements('.pagination-arrow.pagination-forward');
        if (hasMorePages > 0) {
            I.click('.pagination-arrow.pagination-forward');
            I.wait(1);
        }
    }
});

Then("I see {string} element", (text: string) => {
    I.click(`//div[contains(text(), '${text}')]`);
});
