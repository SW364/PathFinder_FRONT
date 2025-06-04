// cypress/e2e/home.cy.js
describe('Pantalla inicial de login', () => {
  it('Debe mostrar el campo de email y los botones Yes/No', () => {
    cy.visit('/');
    cy.get('input[type="email"]', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Yes').should('be.visible');
    cy.contains('button', 'No').should('be.visible');
  });
});
