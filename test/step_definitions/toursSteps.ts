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
});

Then("I go to the tours creation page", () => {
  I.amOnPage("/tours/create");
  I.wait(2);
});

When("I enter tours form fields:", (formData) => {
  formData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When(
  "I attach the tours file {string} to the {string} input",
  (filePath, inputSelector) => {
    I.waitForElement(inputSelector);
    I.attachFile(inputSelector, filePath);
  },
);

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the home page", () => {
  I.amOnPage("/");
  I.wait(3);
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

When("I click the {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the admin tours page", () => {
  I.amOnPage("/admin/tours/1");
  I.wait(2);
});

When("I click the {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(5);
});

When('I click the first "Edit" link', async () => {
  I.click('//a[contains(text(), "Edit")][1]');
  I.wait(5);
});

When(
  "I attach the new file {string} to the {string} input",
  (filePath, inputSelector) => {
    I.attachFile(inputSelector, filePath);
    I.wait(1);
  },
);

When("I navigate to the tours edit page", async () => {
  const currentUrl = await I.grabCurrentUrl();

  const parts = currentUrl.split("/");
  const id = parts[parts.length - 1];
  I.amOnPage(`/tours/edit/${id}`);
  I.wait(1);
});

When(
  "I attach the new file {string} to the {string} input",
  (filePath, inputSelector) => {
    I.attachFile(inputSelector, filePath);
    I.wait(1);
  },
);

Then("I click {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the admin tours page", () => {
  I.amOnPage("/admin/tours/1");
  I.wait(5);
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

When("I click the {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
});

Then("I go to the admin tours page", () => {
  I.amOnPage("/admin/tours/1");
  I.wait(5);
});
When("I click the {string} button", (text: string) => {
  I.click(`//button[contains(text(), '${text}')]`);
  I.wait(5);
});
When('I click the first "Delete" button', async () => {
  I.click('//button[contains(text(), "Delete")][1]');
  I.wait(2);
});
Then(
  "I see the confirmation alert {string}",
  async (confirmationMessage: string) => {
    const alertText = await I.grabPopupText();
    assert.equal(
      alertText,
      confirmationMessage,
      `Expected alert message: ${confirmationMessage}, Actual: ${alertText}`,
    );
  },
);

Then(
  'I confirm the deletion by clicking "ok" in the confirmation alert',
  () => {
    I.acceptPopup();
    I.wait(2);
  },
);

Then("I stay on the tours admin page", () => {
  I.amOnPage("/admin/tours/1");
  I.wait(2);
});

When('I am on home page', async () => {
  I.amOnPage("/");
  I.wait(2);
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

When("I click the select", () => {
  // I.click('//div[@class=" css-1jqq78o-placeholder"]');
  I.click('//div[contains(text(), "Select guide")]');
  // I.click('#react-select-3-input');
  // I.click('//input[@class="react-select__input"]');

  // I.waitForVisible('//div[@class=" css-1nmdiq5-menu"]', 5);
  // I.click('//div[@class=" css-1nmdiq5-menu"] > :first-child');
  I.waitForVisible('//div[@class="react-select__option"][1]', 5);
  I.click('//div[@class="react-select__option"][1]');

  I.wait(2);
});

// When("I choose first option", () => {
//   I.waitForVisible('//div[@class="css-1nmdiq5-menu"] > :first-child', 5);
//   I.click('//div[@class="css-1nmdiq5-menu"] > :first-child');
//   I.wait(2);
// });
When("I enter tour form fields:", (userData) => {
  userData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
});

When("I click {string} button", (text: string) => {
  I.click('//button[@class="one-tour-order-form-btn"]');
});

Then("I go back to the home page", () => {
  I.amOnPage("/");
  I.wait(2);
});
