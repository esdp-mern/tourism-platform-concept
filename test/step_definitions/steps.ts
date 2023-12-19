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