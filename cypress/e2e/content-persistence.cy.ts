import { correctLogin } from "./login.cy";

describe("content persistence", () => {
  it("persists content after page refresh", () => {
    correctLogin();

    cy.get('button[aria-label="toolbar add idea"').click();

    const ideaTitle = "just created idea";

    cy.get('input[placeholder="Title"]').type(ideaTitle);

    cy.reload();

    cy.get('input[placeholder="Title"]').should("have.value", ideaTitle);
  });
});
