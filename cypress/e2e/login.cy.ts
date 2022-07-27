export const correctLogin = () => {
  cy.visit("/auth/sign-in");

  cy.get('input[type="email"]').type("admin");
  cy.get('input[type="password"]').type("admin");

  cy.get("button").click();
};

describe("login", () => {
  it("login correctly", () => {
    correctLogin();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("show error alert on incorrect login", () => {
    cy.visit("/auth/sign-in");

    cy.get('input[type="email"]').type("wrong");
    cy.get('input[type="password"]').type("credentials");

    cy.get("button").click();

    cy.get('div[role="alert"]').should("be.visible");
  });
});
