describe('Career Path Form Flow', () => {
  const EMAIL = 'camagc6@gmail.com';
  const PASSWORD = '12345678';

  it('Logs in and fills out career path form successfully', () => {
    cy.visit('http://localhost:3000');

    // Paso 1: Email
    cy.get('input[type="email"]').type(EMAIL);

    // Paso 2: Botón "Yes"
    cy.contains('button', 'Yes').click();

    // Paso 3: Password
    cy.get('input[type="password"]').type(PASSWORD);

    // Paso 4: Log in
    cy.get('button.purple-btn').contains('Log in').click();

    // Espera que se redireccione a /home y el botón esté visible
    cy.url().should('include', '/home');

    // Espera que aparezca el enlace a Career
    cy.get('.sidebar-link-container a.sidebar-link', { timeout: 10000 })
      .should('contain.text', 'Career')
      .click();

    // Verifica la URL de career
    cy.url().should('include', '/career');

    // Llenar los textareas
    cy.get('textarea[name="objective"]')
      .should('be.visible')
      .type('I want to specialize in frontend development using React and TypeScript.');

    cy.get('textarea[name="skills"]')
      .should('be.visible')
      .type('JavaScript fundamentals, UI/UX principles, and advanced React patterns.');

    cy.get('textarea[name="values"]')
      .should('be.visible')
      .type('My goal is to create meaningful software that aligns with user needs and personal growth.');

    // Enviar el formulario
    cy.get('button[type="submit"]')
      .should('contain.text', 'Find Courses')
      .click();

    // Esperar que redirija a /recommendations
    cy.url({ timeout: 10000 }).should('include', '/recommendations');
  });
});
