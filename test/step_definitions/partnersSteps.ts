import assert from "assert";

const { I } = inject();

Given("I am on sign in page", () => {
  I.amOnPage("/login");
  I.wait(1);
});

When("I enter form fields:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(3);
});

When("I click {string} link", (text: string) => {
  I.click(`//a[contains(text(), '${text}')]`);
});

Then("I go to the partner accepting page", () => {
  I.amOnPage("/admin/partnerOrders/1");
  I.wait(5);
});

When('I click the first "Accept" button', async () => {
  I.click('//button[contains(text(), "Accept")][1]');
  I.wait(3);
});

Then('I go to the home page', () => {
  I.amOnPage("/");
  I.wait(4);
});
