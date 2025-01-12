/// <reference types="cypress" />

//Skip coming soon is not being displayed anymore
describe.skip('Coming Soon Page', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.visit('/personalise-a-resource');
            cy.viewport('macbook-15');
        });

        it('Coming soon message exists', () => {
            cy.get('#coming-soon-message-container').should('exist');
            cy.get('#coming-soon-title').should('exist');
            cy.get('#coming-soon-description').should('exist');
        });

        it('Navbar should exist', () => {
            cy.get('#desktop-growAndGo').should('exist');
        });

        it('Footer should exist', () => {
            cy.get('#feedback-footer-container').should('exist');
            cy.get('#footer-links-container').should('exist');
        });

        it('For more info section should exist', () => {
            cy.get('#for-more-info-container').should('exist');
            cy.get('#title-route-large-title').should('exist');
            cy.contains('#title-route-button', 'Contact us').click();
            cy.get('#split-section').should('exist');
        });
    });
});
