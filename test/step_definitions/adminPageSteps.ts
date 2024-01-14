import assert from "assert";

const { I } = inject();

Then("I go to the prev page", () => {
    I.executeScript("window.history.back();");
    I.wait(2);
});

When("I click {string} admin link", (text: string) => {
    I.click(`//h4[contains(text(), '${text}')]`);
});

Then("I wait {int} sec", (number: number) => {
    I.wait(number);
});