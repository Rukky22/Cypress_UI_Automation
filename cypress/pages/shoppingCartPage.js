class ShoppingCartPage {
  elements = {
    cartItems: () => cy.get(".table-responsive tbody tr"),
    itemNames: () => cy.get(".table-responsive tbody tr td.text-left a"),
    emptyCartMessage: () =>
      cy.get('#content p:contains("Your shopping cart is empty!")'),
  };

  verifyCartContainsItems(expectedItems) {
    this.elements.itemNames().then(($items) => {
      const actualItems = Cypress.$.makeArray($items).map((el) =>
        el.innerText.trim()
      );
      expectedItems.forEach((item) => {
        expect(actualItems.some((actual) => actual.includes(item))).to.be.true;
      });
    });
    return this;
  }
}

module.exports = { ShoppingCartPage };
