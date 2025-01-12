/// <reference types="cypress" />

describe('Contact us form ', () => {
    context('Desktop', () => {
        beforeEach(() => {            
            cy.viewport('macbook-15');
            cy.visit('/contact-us');
            cy.loadedGoogleReCAPTCHA();
        });

        it('Submit button should be disabled initially', () => {
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
        });

        it('Submit button should be disabled until form is complete', () => {
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
            cy.get('#firstName').type('Test');
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
            cy.get('#lastName').type('User');
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
            cy.get('#emailAddress').type('test@user.com');
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
            cy.get('#subject').type('Test subject');
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
            cy.get('#message').type('Hey, this is a test');
            cy.solveGoogleReCAPTCHA();
            cy.get('#find-help-button').click();
            cy.url().should('not.include', 'contact-us');
        });
    });

    context('Mobile View', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/contact-us');
            cy.loadedGoogleReCAPTCHA();            
        });

        it('Mobile: Submit button should be disabled initially', () => {
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
        });

        it('Mobile: Submit button should be disabled until form is complete', () => {
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
            cy.get('#firstName').type('Test', { force: true });
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
            cy.get('#lastName').type('User', { force: true });
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
            cy.get('#emailAddress').type('test@user.com', { force: true });
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
            cy.get('#subject').type('Test subject', { force: true });
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('include', 'contact-us');
            cy.get('#message').type('Hey, this is a test', { force: true });
            cy.solveGoogleReCAPTCHA();
            cy.get('#find-help-button').click({ force: true });
            cy.url().should('not.include', 'contact-us');
        });
    });
});
