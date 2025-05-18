const { ShoppingCartPage } = require("../pages/shoppingCartPage");

class HomePage {
  WebLocators = {
    searchInput: 'input[name="search"]',
    searchButton: '[class="btn btn-default btn-lg"]',
    addtocart: "Add to Cart",
    messageLocator: '[class="alert alert-success alert-dismissible"]',
  };

  elements = {
    searchInput: () => cy.get('header input[name="search"]'),
    searchButton: () =>
      cy.get('header button[type="button"].btn.btn-default.btn-lg'),
    addToCartButtons: () => cy.get('button:contains("Add to Cart"):visible'),
    successAlert: () => cy.get(".alert-success:visible"),
    shoppingCartLink: () => cy.get('a[title="Shopping Cart"]:visible'),
    cartTotal: () => cy.get("#cart-total:visible"),
    emptyCartMessage: () =>
      cy.get('p:contains("Your shopping cart is empty!")'),
    productRows: () => cy.get('.table tbody tr:has(a[href*="product_id"])'),
  };

  searchAndAddProduct(productName) {
    return this.elements
      .searchInput()
      .first()
      .clear({ force: true })
      .type(productName, { delay: 30 })
      .then(() => this.elements.searchButton().click())
      .then(() => {
        cy.intercept("POST", "**/cart/add").as("addToCart");
        return this.elements
          .addToCartButtons()
          .first()
          .should("be.visible")
          .click()
          .wait("@addToCart", { timeout: 10000 });
      })
      .then(() => this.verifyProductAdded(productName))
      .then(() => this.verifyCartUpdated());
  }

  verifyProductAdded(productName) {
    return this.elements
      .successAlert()
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const cleanText = text
          .toLowerCase()
          .replace(/[^a-z0-9:! ]/g, "")
          .trim();
        expect(cleanText).to.include(
          `success: you have added ${productName.toLowerCase()}`
        );
        return this;
      });
  }

  verifyCartUpdated() {
    return this.elements
      .cartTotal()
      .should("not.contain", "0 item(s)")
      .then(() => this);
  }

  clearSearch() {
    return this.elements.searchInput().first().clear();
  }

  navigateToCart() {
    return cy.visit("/index.php?route=checkout/cart");
  }

  emptyCart() {
    return cy
      .visit("/index.php?route=checkout/cart", { failOnStatusCode: false })
      .then(() => {
        return cy.get("body").then(($body) => {
          const removeButtons = $body.find(
            'button[data-original-title="Remove"]'
          );
          if (removeButtons.length > 0) {
            return Cypress.Promise.all(
              Cypress.$.makeArray(removeButtons).map((button) => {
                return cy
                  .wrap(button)
                  .click()
                  .then(() =>
                    cy.get("#cart-total").should("not.contain", "item(s)")
                  );
              })
            );
          }
          return cy.wrap(null);
        });
      });
  }

  searchProduct(productName) {
    cy.get(this.WebLocators.searchInput).type(productName);
    cy.get(this.WebLocators.searchButton).click();
    return this;
  }

  addToCart() {
    cy.contains(this.WebLocators.addtocart).click();
    return this;
  }

  confirmMessages() {
    return cy.get(this.WebLocators.messageLocator);
  }

  // Alias methods for compatibility
  addFirstProductToCart() {
    return this.addToCart(); // Alias for old tests
  }

  verifySuccessMessageContains(text) {
    return this.confirmMessages().should("contain", text);
  }
}

module.exports = { HomePage };
