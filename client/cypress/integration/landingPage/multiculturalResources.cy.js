/// <reference types="cypress" />

describe('Multicultural resources Page', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.viewport('macbook-15');
        });

        it('Header exists', () => {
            cy.get('#desktop-multiculturalResources').should('exist');
        });

        it('Header button routes on click', () => {
            cy.get('#desktop-multiculturalResources').click();
            cy.url().should('include', 'pathway=multicultural-resources');
            cy.contains('h1', 'Multicultural resources').should('exist');
        });

        it('Carousel exists', () => {
            cy.get('#desktop-multiculturalResources').click();
            cy.get('#carousel').should('exist');
        });

        it('Carousel can be slided horizontally', () => {
            cy.get('#desktop-multiculturalResources').click();
            cy.get('#carousel').should('exist');
            cy.get('#carousel').scrollIntoView();
            cy.contains('div', 'አማርኛ').should('be.visible');
            cy.get('#carousel').scrollTo(800, 0);
            cy.contains('div', 'አማርኛ').should('not.be.visible');
        });

        it('Carousel button routes on click', () => {
            cy.get('#desktop-multiculturalResources').click();
            cy.get('#carousel').should('exist');
            cy.get('#carousel').scrollIntoView();
            cy.contains('div', 'አማርኛ').click();
            cy.url().should('include', '/search?languages=Amharic');
        });

        it('English name appears in brackets on button hover', () => {
            cy.get('#desktop-multiculturalResources').click();
            cy.get('#carousel').should('exist');
            cy.get('#carousel').scrollIntoView();
            cy.contains('div', 'አማርኛ').trigger('mouseover');
            cy.contains('div', '(Amharic)').should('be.visible');
        });

        it("Can't find your language button exists", () => {
            cy.get('#desktop-multiculturalResources').click();
            cy.contains('h2', "Can't find your language?").should('exist');
        });

        it("Can't find your language button routes on click", () => {
            cy.get('#desktop-multiculturalResources').click();
            cy.contains('button', 'Let us know...').click();
            cy.url().should('include', '/contact-us');
        });

        it("Culturally adapted resources multicultural eating practices button button work", () => {
            cy.get('#desktop-multiculturalResources').click();
            cy.get("#multicultural-eating-practices-button").click();
            cy.url().should('include', '/search?subcategories=Cultural+Eating+Practices');

        });
    });

    context('Mobile', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-multiculturalResources').click();
            cy.url().should('include', 'pathway=multicultural-resources');
        });

        it('Header exists', () => {
            cy.get('#mobile-multiculturalResources').should('exist');
        });

        it('Hamburger button exists', () => {
            cy.get('#hamburger-button').should('exist');
        });

        it('Header button routes on click', () => {
            cy.contains('h1', 'Multicultural resources').should('exist');
        });
        it('Carousel exists', () => {
            cy.get('#carousel').should('exist');
        });

        it('Carousel can be slided horizontally', () => {
            cy.get('#carousel').should('exist');
            cy.get('#carousel').scrollIntoView();
            cy.get('#carousel').scrollTo(400, 0);
            cy.contains('div', 'አማርኛ').should('be.visible');
            cy.get('#carousel').scrollTo(800, 0);
            cy.contains('div', 'አማርኛ').should('not.be.visible');
        });

        it('Carousel button routes on click', () => {
            cy.get('#carousel').should('exist');
            cy.get('#carousel').scrollIntoView();
            cy.contains('div', 'አማርኛ').click({ force: true });
            cy.url().should('include', '/search?languages=Amharic');
        });

        it('Can find your language button exists', () => {
            cy.contains('h2', "Can't find your language?").should('exist');
        });

        it('Can find your language button routes on click', () => {
            cy.contains('button', 'Let us know...').click({ force: true });
            cy.url().should('include', '/contact-us');
        });
    });
});
