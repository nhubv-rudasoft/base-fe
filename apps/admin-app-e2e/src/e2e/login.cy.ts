describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/auth/signin');
  });

  it('should display login form', () => {
    cy.get('h1').should('contain', 'Login to your account');
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
    cy.get('form').contains('Invalid email format').should('be.visible');
  });

  it('should successfully login with valid credentials', () => {
    cy.intercept('POST', '**/api/v1/auth/signin', {
      responseCode: 200,
      responseMessage: 'successful',
      responseEntityMessages: null,
      body: {
        accessToken: 'fake-jwt-token',
        tokenType: 'Bearer',
      },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('buinhu@hotmail.com.vn');
    cy.get('input[name="password"]').type('HaNoi1234@#$');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('eq', Cypress.config().baseUrl + '/dashboard');
    cy.window().its('localStorage').invoke('getItem', 'access_token').should('exist');
    cy.window().its('localStorage').invoke('getItem', 'refresh_token').should('exist');
  });

  it('should handle login failure for invalid credentials', () => {
    cy.intercept('POST', '**/api/v1/auth/signin', {
      responseCode: '400',
      responseMessage: 'Bad credentials',
      responseEntityMessages: null,
      body: null,
    }).as('loginFailure');

    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFailure');
    cy.get('.error-message').should('contain', 'Bad credentials');
    cy.url().should('include', '/auth/signin');
  });

  it('should have social login options', () => {
    cy.get('button[data-provider="google"]').should('exist');
    cy.get('button[data-provider="facebook"]').should('exist');
  });
});
