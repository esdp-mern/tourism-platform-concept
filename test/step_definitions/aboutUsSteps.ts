import assert from "assert";

const { I } = inject();

When('I click the first post edit button on the about us page', async () => {
    I.click('//div[@class="about-page-advantages-card"][1]');
    I.click("(//button[@class='about-page-edit-btn' and @name='posts'])[1]");
    I.wait(2);
});
When("I click {string} edit button", (text: string) => {
    I.click(`//button[@class="about-page-edit-btn" and @name='${text}']`);
    I.wait(2);
});

When("I enter new form fields:", (userData) => {
    userData.rows.forEach((row) => {
        const [fieldName, fieldValue] = row.cells;
        I.clearField(fieldName.value);
        I.fillField(fieldName.value, fieldValue.value);
    });
});

When("I click the save button edit about us", () => {
    I.click(`//button[@class="about-page-edit-modal-btn" and contains(text(), "Save")]`);
});


When("I see edit modal window", () => {
    I.wait(2);
    I.seeElement("//form[contains(@class, 'about-page-edit-modal')]");
});

Then("I see {string} text", (text: string) => {
   I.see(text);
});


