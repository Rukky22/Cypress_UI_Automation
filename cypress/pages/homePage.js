class HomePage {
  WebLocators = {
    searchInput: 'input[name="search"]1',
    searchButton: '[class="btn btn-default btn-lg"]',
    addtocart: "Add to Cart",
    messageLocator: '[class="alert alert-success alert-dismissible"]'
  };

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
}

module.exports = { HomePage };
