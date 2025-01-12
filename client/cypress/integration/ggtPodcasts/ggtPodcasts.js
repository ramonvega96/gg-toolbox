/// <reference types="cypress" />

describe('Lumpy Road To Solids', () => {
    context('Desktop', () => {
        beforeEach(() => {            
            cy.viewport('macbook-15');
            cy.visit('/G&G-podcast');
        });

        it('All accordions are displayed', () => {
            cy.get('[data-cy="accordion-btn"]').its('length').should('eq', 9);
        });

        it('Podcast #1 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(0).click();
            cy.get('[data-cy="accordion-btn"]').eq(1).click();
            cy.get('[data-cy="podcast-pd1Desc"]').should('be.visible');
        });

        it('Podcast #2 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(0).click();
            cy.get('[data-cy="accordion-btn"]').eq(2).click();
            cy.get('[data-cy="podcast-pd2Desc"]').should('be.visible');
        });

        it('Podcast #3 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(3).click();
            cy.get('[data-cy="podcast-pd3Desc"]').should('be.visible');
        });

        it('Podcast #4 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(4).click();
            cy.get('[data-cy="podcast-pd4Desc"]').should('be.visible');
        });

        it('Podcast #5 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(5).click();
            cy.get('[data-cy="accordion-btn"]').eq(6).click();
            cy.get('[data-cy="podcast-pd5Desc"]').should('be.visible');
        });

        it('Podcast #6 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(5).click();
            cy.get('[data-cy="accordion-btn"]').eq(7).click();
            cy.get('[data-cy="podcast-pd6Desc"]').should('be.visible');
        });

        it('Podcast #7 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(8).click();
            cy.get('[data-cy="podcast-pd7Desc"]').should('be.visible');
        });
    });

    context('Mobile View', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/G&G-podcast');
        });
        
        it('Mobile: All accordions are displayed', () => {
            cy.get('[data-cy="accordion-btn"]').its('length').should('eq', 9);
        });

        it('Mobile: Podcast #1 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(0).click();
            cy.get('[data-cy="accordion-btn"]').eq(1).click();
            cy.get('[data-cy="podcast-pd1Desc"]').should('be.visible');
        });

        it('Mobile: Podcast #2 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(0).click();
            cy.get('[data-cy="accordion-btn"]').eq(2).click();
            cy.get('[data-cy="podcast-pd2Desc"]').should('be.visible');
        });

        it('Mobile: Podcast #3 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(3).click();
            cy.get('[data-cy="podcast-pd3Desc"]').should('be.visible');
        });

        it('Mobile: Podcast #4 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(4).click();
            cy.get('[data-cy="podcast-pd4Desc"]').should('be.visible');
        });

        it('Mobile: Podcast #5 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(5).click();
            cy.get('[data-cy="accordion-btn"]').eq(6).click();
            cy.get('[data-cy="podcast-pd5Desc"]').should('be.visible');
        });

        it('Mobile: Podcast #6 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(5).click();
            cy.get('[data-cy="accordion-btn"]').eq(7).click();
            cy.get('[data-cy="podcast-pd6Desc"]').should('be.visible');
        });

        it('Mobile: Podcast #7 displays properly', () => {
            cy.get('[data-cy="accordion-btn"]').eq(8).click();
            cy.get('[data-cy="podcast-pd7Desc"]').should('be.visible');
        });
    });
});
