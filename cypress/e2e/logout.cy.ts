import { correctLogin } from "./login.cy";

describe("logout", () => {
  it("logout correctly", () => {
    correctLogin();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);

    cy.get("button").contains("Log out").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/auth/sign-in`);
  });
});
