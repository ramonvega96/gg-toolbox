/// <reference types="cypress" />

describe('Footer component Page', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.viewport('macbook-15');
        });

        it('Footer exists', () => {
            cy.get('#feedback-footer-container').should('exist');
        });

        it('Footer contact button works', () => {
            cy.get('#feedback-survey-button').click();
        });

        it('Footer links exist', () => {
            cy.get('#footer-links-container').should('exist');
        });

        it('Footer acknowledgement exist', () => {
            cy.get('#acknowledgement-custodian-container').should('exist');
        });

        it('Footer find a HP quick link works', () => {
            cy.get('#find-a-hp-quick-link').click();
            cy.url()
                .should('be.equal', 'http://localhost:3000/find-a-health-professional')
        });

        it('Footer help quick link works', () => {
            cy.get('#help-quick-link').click();
            cy.url()
                .should('be.equal', 'http://localhost:3000/help')
        });

        it('Footer about quick link works', () => {
            cy.get('#about-quick-link').click();
            cy.url()
                .should('be.equal', 'http://localhost:3000/about-us')
            cy.get('#about-us-container').should('exist');
        });

        it('Footer upload a resource quick link works', () => {
            cy.get('#upload-resource-quick-link').click();
            cy.url()
                .should('be.equal', 'http://localhost:3000/upload-a-resource')
        });

        it('Footer terms of use quick link works', () => {
            cy.get('#terms-of-use-quick-link').click();
            cy.url()
                .should('be.equal', 'http://localhost:3000/terms-of-use')
            cy.get('#terms-and-conditions-container').should('exist');
        });

        it('Footer accessibility quick link works', () => {
            cy.get('#accessibility-quick-link').click();
            cy.url()
                .should('be.equal', 'http://localhost:3000/accessibility')
            cy.get('#accessibility-container').should('exist');
        });

        it('Footer login quick link works', () => {
            cy.get('#login-quick-link').click();
            cy.url()
                .should('be.equal', 'http://localhost:3000/login')
            cy.get('#login-container').should('exist');
        });

    });
});
