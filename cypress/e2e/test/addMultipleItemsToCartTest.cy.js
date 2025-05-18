const { HomePage } = require("../../pages/homePage");
const testData = require("../../fixtures/testData.json");

describe("Multiple Product Cart Test", () => {
  const homePage = new HomePage();

  //Get all testData.products'value as an array i.e testProducts=["MacBook Air", "iphone", "Samsung"] 
  const testProducts = Object.values(testData.products);

  beforeEach(() => {
    cy.login(testData.login.userName, testData.login.password);
    cy.url().should("include", "route=account/account");
  });

  it("should add multiple products to cart and verify", () => {
    // Create an array of promises
  const addProductPromises = testProducts.map((product) => {
    return homePage.searchAndAddProduct(product.name)
      .then(() => {
        return homePage.elements.searchInput().first().clear();
      });
  });

  // Execute all product additions sequentially
  cy.wrap(addProductPromises, { log: false })
    .each((promise) => cy.wrap(promise))
    .then(() => {
      // Verify all products in cart
      const shoppingCart = homePage.navigateToCart();
      shoppingCart.verifyCartContents(testProducts.map((p) => p.name));
      
          // Verify default quantities (1 for each)
          shoppingCart.verifyQuantities(testProducts.map(() => "1"));
    });

    // Verify total items count
    homePage.elements
      .cartTotal()
      .should("contain", `${testProducts.length} item(s)`);
  });

});
