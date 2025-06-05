describe('Career Path Flow (Local)', () => {
  const BASE_URL = 'http://localhost:3000';

  it('Fills out the form and navigates to recommendations', () => {
    // 1. Go to home
    cy.visit(`${BASE_URL}/home`);

    // 2. Click the styled button inside .goal-header
    cy.get('.goal-header button')
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0.06)')
      .and('have.css', 'color', 'rgb(155, 77, 255)')
      .click();

    // 3. Open sidebar and click the Career link
    cy.get('.sidebar-link-container a.sidebar-link')
      .contains('Career')
      .click();

    // 4. Check URL change
    cy.url().should('include', '/career');

    // 5. Fill out the textareas with meaningful input

    cy.get('textarea[name="objective"]').type(
      'I want to pursue a career as a technical leader in applied AI, focusing on solving real-world problems.'
    );

    cy.get('textarea[placeholder*="priority areas for training"]').type(
      'I need to enhance my skills in machine learning, team leadership, and scalable software design.'
    );

    cy.get('textarea[name="values"]').type(
      'I am driven by the desire to create meaningful impact through technology and align my career with purpose-driven work.'
    );

    // 6. Submit the form
    cy.get('button[type="submit"]').contains('Find Courses').click();

    // 7. Wait for redirect
    cy.url({ timeout: 10000 }).should('include', '/recommendations');
  });
});
