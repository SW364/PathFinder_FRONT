// cypress/e2e/error-test.cy.js
describe('Prueba de fallo controlado', () => {
  it('Debe fallar al buscar un texto inexistente', () => {
    cy.visit('/');
    cy.contains('Este texto no existe en la app', { timeout: 5000 }).should('be.visible');
  });
});
