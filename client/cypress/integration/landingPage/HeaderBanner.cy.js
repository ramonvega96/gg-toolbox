/// <reference types="cypress" />

describe('Header Banner', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.viewport('macbook-15');
        });

        it('Header exists', () => {
            cy.get('#header-banner').should('exist');
        });

        it('Header text is correct', () => {
            cy.get('#header-banner')
                .find('#header-banner-text')
                .should(
                    'have.text',
                    'All resources are Australian based and have been verified by health professionals and field experts'
                );
        });

        it('Header has Help button', () => {
            cy.get('#header-banner').find('#help-button').should('exist');
        });

        it('Header has Contact button', () => {
            cy.get('#header-banner').find('#contact-button').should('exist');
        });

        it('Header has Follow Us button', () => {
            cy.get('#header-banner').find('#follow-us-button').should('exist');
        });

        it('Help button opens Help page', () => {
            cy.get('#help-button').click();
            cy.url().should('include', '/help');
        });

        it('Contact button opens Contact page', () => {
            cy.get('#contact-button').click();
            cy.url().should('include', '/contact-us');
        });
    });

    context('Mobile', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/');
            cy.get('#hamburger-button').click();
        });

        it('Mobile: Options container exists', () => {
            cy.get('#burguer-options').should('exist');
        });

        it('Mobile: Options container has Help button', () => {
            cy.get('#burguer-options').find('#burguer-help').should('exist');
        });

        it('Mobile: Options container has Contact button', () => {
            cy.get('#burguer-options').find('#burguer-contact').should('exist');
        });

        it('Mobile: Options container has Follow Us button', () => {
            cy.get('#burguer-options').find('#burguer-follow-us').should('exist');
        });
        
        it('Mobile: Help button opens Help page', () => {
            cy.get('#burguer-help').click();
            cy.url().should('include', '/help');
        });

        it('Mobile: Contact button opens Contact page', () => {
            cy.get('#burguer-contact').click();
            cy.url().should('include', '/contact-us');
        });
    });
});
