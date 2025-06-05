describe('Career Path Form Flow', () => {
  const BASE_URL = 'http://localhost:3000';
  const EMAIL = 'camagc6@gmail.com';
  const PASSWORD = '12345678';

  it('Logs in and completes career path form', () => {
    // 1. Visit login
    cy.visit(BASE_URL);

    // 2. Enter email
    cy.get('input[type="email"]').type(EMAIL);

    // 3. Click "Yes"
    cy.contains('button', 'Yes').click();

    // 4. Enter password
    cy.get('input[type="password"]').type(PASSWORD);

    // 5. Click "Log in"
    cy.get('button.purple-btn').contains('Log in').click();

    // 6. Wait for /home and confirm login success
    cy.url({ timeout: 10000 }).should('include', '/home');
    cy.contains('Welcome, Gilberto Camacho', { timeout: 10000 }).should('be.visible');

    // 7. Click "Career Path" in the sidebar
    cy.contains('Career Path', { timeout: 10000 }).click();

    // 8. Confirm redirection
    cy.url({ timeout: 10000 }).should('include', '/career');

    // 9. Fill out the form
    cy.get('textarea[name="objective"]')
      .should('be.visible')
      .type('I want to grow into a technical lead role in frontend development.');

    cy.get('textarea[name="skills"]')
      .should('be.visible')
      .type('I want to improve my React, testing, and architectural skills.');

    cy.get('textarea[name="values"]')
      .should('be.visible')
      .type('I’m driven by personal growth and creating meaningful digital experiences.');

    // 10. Submit the form
    cy.get('button[type="submit"]').contains('Find Courses').click();

    // 11. Wait for redirect to /recommendations
    cy.url({ timeout: 10000 }).should('include', '/recommendations');
  });
});
