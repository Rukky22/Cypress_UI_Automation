const { HomePage } = require("../../pages/homePage");
const testData = require("../../fixtures/testData.json");


describe("Multiple Product Cart Test", () => {
  const homePage = new HomePage();
  const testProducts = [
    { searchTerm: "MacBook Air", displayName: "MacBook Air" },
    { searchTerm: "iphone", displayName: "iPhone" },
    { searchTerm: "Samsung Galaxy Tab 10.1", displayName: "Samsung Galaxy Tab 10.1" }
  ];

  before(() => {
    cy.login(testData.login.userName, testData.login.password);
    return homePage.emptyCart()
      .then(() => cy.logout());
  });

  beforeEach(() => {
    cy.login(testData.login.userName, testData.login.password);
    cy.url().should("include", "route=account/account");
  });

  it("should add multiple products to cart and verify", { defaultCommandTimeout: 15000 }, () => {
    // Add products sequentially
    testProducts.forEach((product) => {
      cy.log(`Adding product: ${product.searchTerm}`);
      homePage.searchAndAddProduct(product.searchTerm);
      homePage.clearSearch();
    });

    // Verify cart contents
    homePage.navigateToCart();
    
    // Count product rows
    homePage.elements.productRows()
      .should('have.length', testProducts.length);

    // Verify each product exists
    testProducts.forEach((product) => {
      cy.contains('.table tbody tr td.text-left a', product.displayName)
        .should('exist');
    });

    // Verify quantities
    cy.get('.table tbody input[name*="quantity"]').each(($input) => {
      cy.wrap($input).should('have.value', '1');
    });

    // Verify total
    homePage.elements.cartTotal()
      .should('contain', `${testProducts.length} item(s)`);
  });

  afterEach(() => {
    cy.logout();
  });
});