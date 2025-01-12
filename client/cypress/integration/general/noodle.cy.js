/// <reference types="cypress" />

describe('Noodles Component ', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.viewport('macbook-15');
        });

        /*

        it('Noodle in Multicultural Resources exists', () => {
            cy.get('#desktop-multiculturalResources').click();
            cy.get('#noodle-6').should('exist');
        });

        it('Noodle in Parents and Carers Resources exists', () => {
            cy.get('#desktop-parentsAndFamilies').trigger('mouseover');
            cy.get('#resources-for-parents-and-families').click();
            cy.get('#noodle-4').should('exist');
        });
        
        */

        it('Noodle in Footer exists', () => {
            cy.get('#noodle-2').should('exist');
        });
    });

    context('Mobile View', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.viewport('iphone-6');
        });

        /*

        it('Noodle in Multicultural Resources exists', () => {
            cy.get('#hamburger-button').click();
            cy.get('#mobile-multiculturalResources').click();
            cy.get('#noodle-6').should('not.be.visible');
        });

        it('Noodle in Parents and Carers Resources exists', () => {
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#noodle-4').should('not.be.visible');
        });

        */

        it('Noodle in Footer exists', () => {
            cy.get('#noodle-2').should('not.exist');
        });
    });
});
