const { ShoppingCartPage } = require("../pages/shoppingCartPage");

class HomePage {
  elements = {
    // More specific search input locator
    searchInput: () => cy.get('header input[name="search"]'),
    searchButton: () => cy.get('header button[type="button"].btn.btn-default.btn-lg'),
    productThumbnails: () => cy.get('.product-thumb'),
    addToCartButtons: () => cy.get('.product-layout button:contains("Add to Cart")'),
    successAlert: () => cy.get('.alert.alert-success'),
    shoppingCartLink: () => cy.get('a[title="Shopping Cart"]')
  };

  searchProduct(productName) {
    this.elements.searchInput()
      .first() // Handle multiple inputs
      .clear({ force: true }) // Force clear if needed
      .type(productName, { delay: 50 });
    this.elements.searchButton().click();
    return this;
  }

  addFirstProductToCart() {
    this.elements.addToCartButtons()
      .first()
      .should('be.visible')
      .click();
    return this;
  }

  verifySuccessMessageContains(productName) {
    this.elements.successAlert()
      .should('be.visible')
      .invoke('text')
      .should('match', new RegExp(productName, 'i')); // Case-insensitive match
    return this;
  }

  navigateToShoppingCart() {
    this.elements.shoppingCartLink().click();
    return new ShoppingCartPage();
  }
}


module.exports = { HomePage };
