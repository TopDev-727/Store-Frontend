const cart = {

  get goToCheckoutBtn(): Cypress.Chainable {
    return cy.get('[data-e2e="go-to-checkout-btn"]');
  }

};

export default cart;
