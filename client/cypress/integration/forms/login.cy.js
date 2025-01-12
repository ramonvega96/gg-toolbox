/// <reference types="cypress" />

describe('Login form ', () => {
    context('Desktop', () => {
        beforeEach(() => {            
            cy.viewport('macbook-15');
            cy.visit('/login');
        });

        it('Login button should be disabled initially', () => {
            cy.get('#login-button').click({ force: true });
            cy.url().should('include', 'login');
        });

        it('Submit button should be disabled until form is complete', () => {
            cy.get('#login-button').click({ force: true });
            cy.url().should('include', 'login');
            cy.get('#username').type('cypressAdminUser');
            cy.get('#login-button').click({ force: true });
            cy.url().should('include', 'login');
            cy.get('#password').type('cypressAdminPwd');
            cy.get('#login-button').click({ force: true });
            cy.url().should('not.include', 'login');
        });
    });

    context('Mobile View', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/login');            
        });

        it('Mobile: Login button should be disabled initially', () => {
            cy.get('#login-button').click({ force: true });
            cy.url().should('include', 'login');
        });

        it('Mobile: Login button should be disabled until form is complete', () => {
            cy.get('#login-button').click({ force: true });
            cy.url().should('include', 'login');
            cy.get('#username').type('cypressAdminUser');
            cy.get('#login-button').click({ force: true });
            cy.url().should('include', 'login');
            cy.get('#password').type('cypressAdminPwd');
            cy.get('#login-button').click({ force: true });
            cy.url().should('not.include', 'login');
        });
    });
});
