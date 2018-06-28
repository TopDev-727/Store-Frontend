describe("checkout page", () => {
  it("Default shipping/billing address should be changed", () => {
    cy.visit("/");
    cy.get(".modal-close").click();
    indexedDB.deleteDatabase("shop");
    cy.clearLocalStorage();
    cy.get(".header button")
      .last()
      .click();
    cy.get("[name=email]").type("logintest@user.co");
    cy.get("[name=password]").type("123qwe!@#");
    cy.get("#remember").check({ force: true });
    cy.get(".button-full").click();
    cy.get(".col-xs-4 > div").click();
    cy.get(
      ".VueCarousel-inner > :nth-child(3) > .product > .no-underline > .product-image > img"
    ).click({ force: true });
    cy.get("[data-testid=addToCart]").click();
    cy.get("[data-testid=notificationAction2]").click();
    cy.get("[data-testid=personalDetailsSubmit]").click({ force: true });
    cy.get("#shipToMyAddressCheckbox").check({ force: true });
    cy.get("[name=street-address]")
      .clear()
      .type("Dmowskiego street", { force: true });
    cy.get("[name=apartment-number]")
      .clear()
      .type("17", { force: true });
    cy.get("[name=city]")
      .clear()
      .type("Wroclaw", { force: true });
    cy.get("[data-testid=shippingSubmit]").click({ force: true });
    cy.get(":nth-child(2) > .col-sm-9 > .row > .h4").should(
      "contain",
      "Wroclaw"
    );
    cy.get("#sendToShippingAddressCheckbox").check({ force: true });
    cy.get("[value=checkmo]")
      .check()
      .should("be.checked");
    cy.get("[data-testid=paymentSubmit]").click({ force: true });
    cy.get("#acceptTermsCheckbox").check({ force: true });
    cy.get("[data-testid=orderReviewSubmit]").click({ force: true });
    cy.get(".category-title").should("contain", "Order confirmation");
  });
});
