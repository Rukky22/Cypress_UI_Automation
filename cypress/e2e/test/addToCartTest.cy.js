const { HomePage } = require("../../pages/homePage");
const testData = require("../../fixtures/testData.json");

describe("Add to Cart Tests", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    cy.login(testData.login.userName, testData.login.password);
    cy.url().should("include", "route=account/account");
  });

  it("should add product to cart with proper success message", () => {
    const product = testData.product.product1;

    homePage
      .searchProduct(product)
      .addFirstProductToCart()
      .verifySuccessMessageContains(product);
  });

  it("should handle multiple search inputs", () => {
    const product = testData.product.product2;

    // Debug search inputs
    cy.get('input[name="search"]').then(($inputs) => {
      cy.log(`Found ${$inputs.length} search inputs`);
    });

    homePage.searchProduct(product).addFirstProductToCart();
  });
});
