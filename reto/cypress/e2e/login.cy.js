describe('Career Path Form Flow', () => {
  const BASE_URL = 'http://localhost:3000';
  const EMAIL = 'camagc6@gmail.com';
  const PASSWORD = '12345678';

  beforeEach(() => {
    cy.session([EMAIL, PASSWORD], () => {
      cy.visit(BASE_URL);
      cy.get('input[type="email"]').type(EMAIL);
      cy.contains('button', 'Yes').click();
      cy.get('input[type="password"]').type(PASSWORD);
      cy.get('button.purple-btn').contains('Log in').click();
      cy.url({ timeout: 10000 }).should('include', '/home');
      cy.window().its('localStorage.authToken').should('exist');
    });
  });

  it('Logs in and completes career path form', () => {
    cy.visit(`${BASE_URL}/home`);
    cy.contains('Welcome, Gilberto Camacho', { timeout: 10000 }).should('be.visible');

    // Open sidebar if necessary
    cy.get('.goal-header button', { timeout: 10000 }).click();

    // Click "Career Path"
    cy.get('.sidebar-link-container a.sidebar-link').contains('Career Path').click();

    cy.url({ timeout: 10000 }).should('include', '/career');

    // Fill out the form
    cy.get('textarea[name="objective"]')
      .should('be.visible')
      .type('I want to grow into a technical lead role in frontend development.');

    cy.get('textarea[name="skills"]')
      .should('be.visible')
      .type('I want to improve my React, testing, and architectural skills.');

    cy.get('textarea[name="values"]')
      .should('be.visible')
      .type('I’m driven by personal growth and creating meaningful digital experiences.');

    // Submit form
    cy.get('button[type="submit"]').contains('Find Courses').click();

    // Check redirect
    cy.url({ timeout: 10000 }).should('include', '/recommendations');
  });
});
