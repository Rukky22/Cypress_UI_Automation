const { HomePage } = require("../../pages/homePage");
const testData = require("../../fixtures/testData.json");

const homePageObj = new HomePage();

describe("simple ui test automation", () => {
  before(() => {
    cy.login(testData.login.userName, testData.login.password); //login using the Cypress command.js
  });

  it("Confirm that a product can be added to cart successfully", () => {
    homePageObj.searchProduct(testData.product.productName);
    homePageObj.addToCart();
    homePageObj
      .confirmMessages()
      .should("contain", testData.message.successMessage)
      .and("contain", testData.product.productName);
  });
});
