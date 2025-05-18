class ShoppingCartPage {
  elements = {
    cartItems: () => cy.get('.table tbody tr'),
    itemNames: () => cy.get('.table tbody tr td.text-left a:first-child'),
    itemQuantities: () => cy.get('.table tbody tr input[name*="quantity"]'),
    cartTotal: () => cy.get('.table tbody tr td:last-child')
  };

  verifyCartContents(expectedProducts) {
    // Verify correct number of items
    this.elements.cartItems()
      .should('have.length', expectedProducts.length);
    
    // Verify each product exists
    this.elements.itemNames()
      .then($items => {
        const actualProducts = Cypress.$.makeArray($items)
          .map(el => el.innerText.trim());
        
        expectedProducts.forEach(expectedProduct => {
          expect(actualProducts).to.include(expectedProduct);
        });
      });
    
    return this;
  }

  verifyQuantities(expectedQuantities) {
    this.elements.itemQuantities()
      .each(($input, index) => {
        cy.wrap($input).should('have.value', expectedQuantities[index]);
      });
    
    return this;
  }
}

module.exports = { ShoppingCartPage };
