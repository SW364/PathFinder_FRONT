// reto/cypress/e2e/home.cy.js
describe('Carga inicial de la app', () => {
  it('Muestra contenido visible en la página principal', () => {
    cy.visit('/');
    cy.contains('PathFinder'); // Cambia esto por texto que siempre aparece al inicio
  });
});
