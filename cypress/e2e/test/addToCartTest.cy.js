const { HomePage } = require("../../pages/homePage");
const testData = require("../../fixtures/testData.json");

const homePageObj = new HomePage();

describe("simple ui test automation", () => {
  beforeEach(() => {
    cy.login(testData.login.userName, testData.login.password); //login using the Cypress command.js
  });

  it("Confirm that a product can be added to cart successfully", () => {
    const searchTerm = testData.product.productName;
    homePageObj.searchProduct(searchTerm);
    homePageObj.addToCart();
    homePageObj
      .confirmMessages()
      .should("contain", "Success: You have added")
      .and("contain", searchTerm);
  });

  it("Confirm that a partial name product can be added to cart successfully", () => {
    const searchTerm = testData.partialNameProduct.productName.toLowerCase();
    homePageObj.searchProduct(searchTerm);
    homePageObj.addToCart();
    homePageObj.confirmMessages().should(($el) => {
      const messageText = $el.text().toLowerCase();

      // Check for success message pattern
      expect(messageText).to.match(
        /success: you have added .* to your shopping cart!/
      );

      // Check that the product name contains our search term
      const productNameInMessage = messageText.match(/added (.*) to your/)[1];
      expect(productNameInMessage).to.include(searchTerm);
    });
  });
});
