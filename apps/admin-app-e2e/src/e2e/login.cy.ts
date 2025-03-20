describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('should display login form', () => {
    cy.get('h1').should('contain', 'Login');
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('form').contains('Email is required').should('be.visible');
    cy.get('form').contains('Password is required').should('be.visible');
  });

  it('should show validation error for invalid email', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('form').contains('Invalid email').should('be.visible');
  });

  it('should successfully login with valid credentials', () => {
    cy.intercept('POST', '**/auth/signin', {
      statusCode: 200,
      body: {
        responseCode: '200',
        responseMessage: 'Success',
        body: {
          accessToken: 'fake-jwt-token',
          refreshToken: 'fake-refresh-token',
          expiresIn: 3600,
          tokenType: 'Bearer',
        },
      },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('buinhu@hotmail.com.vn');
    cy.get('input[name="password"]').type('HaNoi1234@#$');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.window().its('localStorage').invoke('getItem', 'jwt_token').should('exist');
  });

  it('should handle login failure', () => {
    cy.intercept('POST', '**/auth/signin', {
      statusCode: 400,
      body: {
        responseCode: '400',
        responseMessage: 'Invalid credentials',
        body: null,
      },
    }).as('loginFailure');

    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFailure');
    cy.url().should('include', '/signin');
  });

  it('should have Google login option', () => {
    cy.get('button').contains('Login with Google').should('exist');
  });
});
