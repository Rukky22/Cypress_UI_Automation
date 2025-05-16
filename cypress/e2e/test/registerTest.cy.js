// import { RegisterPage } from "../../pages/registerPages";
// import registerData from "../../fixtures/registerData.json"

const { RegisterPage } = require("../../pages/registerPage");
const registerObj = new RegisterPage();
//const registerData = require("../../fixtures/registerData");

import { generateUserData } from "../../support/generateUserData";

describe("Cypress ui automation framework", () => {
  it("Registration of a new user", () => {
    const user = generateUserData();
    registerObj.openURL();
    registerObj.enterFirstName(user.firstName);
    registerObj.enterLastName(user.lastName);
    registerObj.enterEmail(user.email);
    registerObj.enterTelephone(user.phoneNo);
    registerObj.enterPassword(user.password);

    registerObj.selectCheckbox();
    registerObj.clickonContinueButton();

    //Assertions
    cy.url().should("include", "/success");
    cy.contains("Your Account Has Been Created!").should("be.visible");
  });
});
