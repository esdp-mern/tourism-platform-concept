import assert from "assert";

const { I } = inject();
// Add in your custom step files

Given("I have a defined step", () => {});

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

Then("I see {string} in alert.", (text: string) => {
  I.wait(2);
  I.see(text);
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

Then("I see {string} in alert.", (text: string) => {
  I.wait(1);
  I.see(text);
});

Given("I am on the registration page", () => {
  I.amOnPage("/register");
  I.wait(1);
});

When("I enter registration form fields:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I see {string} in alert.", (text: string) => {
  I.wait(2);
  I.see(text);
});

Given("I am on the registration page", () => {
  I.amOnPage("/register");
  I.wait(1);
});

When("I enter registration form fields:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I see {string} in alert.", (text: string) => {
  I.wait(2);
  I.see(text);
});

Given("I am on the registration page", () => {
  I.amOnPage("/register");
  I.wait(1);
});

When("I enter registration form fields:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I should stay on the registration page", () => {
  I.seeInCurrentUrl("/register");
});

Then("the registration form should still be visible", () => {
  I.seeElement("//form[@class='form']");
});

Given('I am on sign in page', () => {
  I.amOnPage("/login");
  I.wait(1);
});

When('I enter form fields:', (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then('I go to the home page',  () => {
  I.amOnPage("/");
  I.wait(2);
});

When("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then('I go to the slider creation page',  () => {
  I.amOnPage("/slider/create");
  I.wait(2);
});
When('I enter form fields:', (formData) => {
  formData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});
When("I attach the file {string} to the {string} input", (filePath, inputSelector) => {
  const relativePath = `../images/${filePath}`;
  console.log(relativePath);
  I.attachFile(inputSelector, filePath);
});

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});
Then('I go to the home page',  () => {
  I.amOnPage("/");
  I.wait(3);
});
Given('I am on sign in page', () => {
  I.amOnPage("/login");
  I.wait(1);
});

When('I enter form fields:', (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When("I click the {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then('I navigate to the home page',  () => {
  I.amOnPage("/");
  I.wait(2);
});

Then('I click the "SPB" span', () => {
  I.click('//span[contains(text(), "SPB")]');
});
When('I click the "Edit" button', async () => {
  console.log('Trying to click "Edit" button');
  await I.click('//button[contains(text(), "Edit")]');
  console.log('Clicked "Edit" button');
  I.wait(3)
});
When('I navigate to the edit page', async () => {
  const currentUrl = await I.grabCurrentUrl();
  console.log('Current URL:', currentUrl);

  const parts = currentUrl.split('/');
  const id = parts[parts.length - 1];
  console.log('Navigating to edit page');
  await I.amOnPage(`/slider/edit/${id}`);
  I.wait(3);
  console.log('Navigated to edit page');
});
When('I enter form fields:', (formData) => {
  formData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});
When("I attach the file {string} to the {string} input", (filePath, inputSelector) => {
  I.attachFile(inputSelector, filePath);
});
Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});
Then('I go to the home page',  () => {
  I.wait(1);
  I.amOnPage("/");
});
Given('I am on sign in page', () => {
  I.amOnPage("/login");
  I.wait(1);
});

When('I enter form fields:', (formData) => {
  formData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When("I click the {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then('I navigate to the home page',  () => {
  I.amOnPage("/");
  I.wait(2);
});

Then('I click the "SPB" span', () => {
  I.click('//span[contains(text(), "SPB")]');
  I.wait(2);
});

Then('I click the "Delete" button', () => {
  I.click('//button[contains(text(), "Delete")]');
  I.wait(2);
});

Then('I see the confirmation alert {string}', async (confirmationMessage: string) => {
  const alertText = await I.grabPopupText();
  assert.equal(alertText, confirmationMessage, `Expected alert message: ${confirmationMessage}, Actual: ${alertText}`);
});

Then('I confirm the deletion by clicking "ok" in the confirmation alert', () => {
  I.acceptPopup();
  I.wait(2);
});

Then('I stay on the home page', () => {
  I.amOnPage("/");
});
