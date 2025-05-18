const { ShoppingCartPage } = require("../pages/shoppingCartPage");

class HomePage {
  elements = {
    searchInput: () => cy.get('header input[name="search"]'),
    searchButton: () =>
      cy.get('header button[type="button"].btn.btn-default.btn-lg'),
    addToCartButtons: () => cy.get('button:contains("Add to Cart")'),
    successAlert: () => cy.get(".alert-success"),
    shoppingCartLink: () => cy.get('a[title="Shopping Cart"]'),
    cartTotal: () => cy.get("#cart-total"),
  };

  searchAndAddProduct(productName) {
    // Return the Cypress chain instead of 'this'
    return cy.wrap(null, { log: false }).then(() => {
      // Clear and search
      return this.elements
        .searchInput()
        .first()
        .clear({ force: true })
        .type(productName, { delay: 30 })
        .then(() => {
          return this.elements.searchButton().click();
        })
        .then(() => {
          // Add to cart with verification
          return this.elements
            .addToCartButtons()
            .first()
            .should("be.visible")
            .click();
        })
        .then(() => {
          // Verify success message
          return this.elements
            .successAlert()
            .should("be.visible")
            .invoke("text")
            .should("match", new RegExp(productName, "i"));
        })
        .then(() => {
          // Verify cart count updates
          return this.elements.cartTotal().should("not.contain", "0 item(s)");
        });
    });
  }

  navigateToCart() {
    this.elements.shoppingCartLink().click();
    return new ShoppingCartPage();
  }
}

module.exports = { HomePage };
