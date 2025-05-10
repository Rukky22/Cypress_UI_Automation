class RegisterPage {
  WebLocators = {
    firstName: '[name="firstname"]',
    lastName: '[name="lastname"]',
    email: "#input-email",
    telePhone: '[name="telephone"]',
    password: '[name="password"]',
    confirmPassword: '[name="confirm"]',
    policyCheckbox: '[name="agree"]',
    continueButton: 'input[value="Continue"]',
  };

  openURL() {
    cy.visit(Cypress.env("URL")); // take note that it is capital letter Cypress not cypress
  }

  enterFirstName(FName) {
    cy.get(this.WebLocators.firstName).type(FName);
    return this;
  }

  enterLastName(LName) {
    cy.get(this.WebLocators.lastName).type(LName);
    return this;
  }

  enterEmail(email) {
    cy.get(this.WebLocators.email).type(email);
    return this;
  }

  enterTelephone(telephone) {
    cy.get(this.WebLocators.telePhone).type(telephone);
    return this;
  }

  enterPassword(password) {
    cy.get(this.WebLocators.password).type(password);
    cy.get(this.WebLocators.confirmPassword).type(password);
  }

  selectCheckbox() {
    cy.get(this.WebLocators.policyCheckbox).check();
    return this;
  }

  clickonContinueButton() {
    cy.get(this.WebLocators.continueButton).click();
    return this;
  }
}

module.exports = { RegisterPage };
