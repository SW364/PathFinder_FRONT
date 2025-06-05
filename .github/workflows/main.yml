// cypress/e2e/career_path_form.cy.js

describe('Career Path Form Flow', () => {
  const BASE_URL = 'http://localhost:3000';

  it('Logs in and fills out career path form successfully', () => {
    // Visit home
    cy.visit(BASE_URL);

    // Step 1: Email
    cy.get('input[type="email"]').type('camagc6@gmail.com');

    // Step 2: Click "Yes" button
    cy.contains('button.btn.px-4.purple-outline-btn.rounded-pill', 'Yes').click();

    // Step 3: Password
    cy.get('input[type="password"]').type('12345678');

    // Step 4: Click "Log in" button
    cy.get('button.btn.w-100.py-2.mb-3.purple-btn.rounded-pill.shadow-sm').click();

    // Step 5: Wait for redirection to /home
    cy.url({ timeout: 10000 }).should('include', '/home');

    // Step 6: Ensure goal-header button is present
    cy.get('.goal-header button').should('exist').click();

    // Step 7: Open sidebar and go to Career Path
    cy.get('li.sidebar-link-container a.sidebar-link').contains('Career').click();

    // Step 8: Fill out the form
    cy.get('textarea[name="objective"]')
      .should('be.visible')
      .type('I want to become a front-end engineer specialized in accessibility and performance.');

    cy.get('textarea[placeholder*="identify the priority areas"]')
      .should('be.visible')
      .type('I need to improve my JavaScript, testing, and responsive design skills.');

    cy.get('textarea[name="values"]')
      .should('be.visible')
      .type('I am motivated by creating inclusive digital experiences and growing as a mentor.');

    // Step 9: Submit the form
    cy.get('button[type="submit"]').contains('Find Courses').click();

    // Step 10: Wait for redirection to recommendations
    cy.url({ timeout: 10000 }).should('include', '/recommendations');
  });
});
