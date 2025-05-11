// import { RegisterPage } from "../../pages/registerPages";
// import registerData from "../../fixtures/registerData.json"

const { RegisterPage } = require("../../pages/registerPage");
const registerData = require("../../fixtures/registerData.json");

const registerObj = new RegisterPage();
describe("cypress ui automation framework", () => {
  it("Validate that users can register with valid credentials", () => {
    registerObj.openURL();
    registerObj.enterFirstName(registerData.firstName);
    registerObj.enterLastName(registerData.lastName);
    registerObj.enterEmail(registerData.email);
    registerObj.enterTelephone(registerData.phoneNo);
    registerObj.enterPassword(registerData.password);
    registerObj.selectCheckbox();
    registerObj.clickonContinueButton();

    //Assertions
    cy.url().should("include", "/success");
    cy.contains("Your Account Has Been Created!").should("be.visible");
  });
});
