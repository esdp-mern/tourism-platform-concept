import assert from "assert";

const { I } = inject();
Given('I am on home page', async () => {
  I.amOnPage("/");
  I.wait(2);
});

When("I navigate to the tours all page", async () => {
  I.amOnPage('/tours/all/1');
  I.refreshPage();
  I.wait(5);
  I.click('//a[@class="tour-item-top"][1]');
  I.wait(5);
});

When("I click the first tour link", async () => {
  I.amOnPage('/');
  I.wait(5);
  I.click('//a[@class="tour-item-top"][1]');
  I.wait(3);
});

When("I navigate to the one tour page", async () => {
  const currentUrl = await I.grabCurrentUrl();

  const parts = currentUrl.split("/");
  const id = parts[parts.length - 1];
  I.amOnPage(`/tours/${id}`);
  I.wait(1);
});

When("I click the select",  () => {
  I.wait(5);
  I.click('//div[contains(@class, "text-field-select")]');
  I.wait(5);
  I.click("//*[@id='react-select-3-option-0']");
});

When("I choose date", () => {
  I.click({ css: 'input[name="date"]' });
  I.click('//td[@class="rdp-cell"][1]');
  I.wait(1);
});

When("I enter tour form email field:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
  I.wait(1);
});

When("I enter tour form tel field:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField({ css: 'input[type="tel"]' }, fieldValue.value);
  });
  I.wait(1);
});

When("I click book button", () => {
  I.click('//a[@class="one-tour-order-form-nav-link"]');
  I.wait(1);
});

Then("I go back to the home page", () => {
  I.amOnPage("/");
  I.wait(2);
});

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
});

When("I click the first tour link", async () => {
  I.click('//a[@class="tour-item-top"][1]');
  I.wait(2);
});

When("I navigate to the one tour page", async () => {
  const currentUrl = await I.grabCurrentUrl();

  const parts = currentUrl.split("/");
  const id = parts[parts.length - 1];
  I.amOnPage(`/tours/${id}`);
  I.wait(1);
});

When("I click the select",  () => {
  I.wait(5);
  I.click('//div[contains(@class, "text-field-select")]');
  I.wait(5);
  I.click("//*[@id='react-select-3-option-0']");
});

When("I choose date", () => {
  I.click({ css: 'input[name="date"]' });
  I.click('//td[@class="rdp-cell"][1]');
  I.wait(1);
});

When("I click book button", () => {
  I.click('//a[@class="one-tour-order-form-nav-link"]');
  I.wait(1);
});

Then("I go back to the home page", () => {
  I.amOnPage("/");
  I.wait(2);
});