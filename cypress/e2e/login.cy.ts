/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login'); // Ajusta si tu ruta de login es diferente
  });

  it('debería mostrar el formulario de login', () => {
    cy.get('[data-testid="correo-input"]').should('exist');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.get('ion-button[type="submit"]').should('exist');
  });

  it('debería mostrar error si se dejan campos vacíos', () => {
    cy.get('ion-button[type="submit"]').click();
    cy.get('ion-alert .alert-message, .alert-wrapper .alert-message').should('contain.text', 'Correo es obligatorio');
  });

  it('debería loguearse correctamente con credenciales válidas', () => {
    cy.get('[data-testid="correo-input"]').type('admin@admin.com');
    cy.get('[data-testid="password-input"]').type('123456');
    cy.get('ion-button[type="submit"]').click();

    // Espera explícita al redireccionamiento antes de verificar la URL
    cy.location('pathname', { timeout: 10000 }).should('eq', '/perfil-usuario');
  });
});