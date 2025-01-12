/// <reference types="cypress" />

describe('Health Professionals Page', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.viewport('macbook-15');
            cy.visit('/');
            cy.get('#desktop-healthProfessionals').trigger('mouseover');
            cy.get('#resources-for-health-professionals').click();
            cy.url().should('include', 'pathway=health-professionals');
        });      

        it('Searchbar component routes properly on search button click', () => {            
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('#search-icon-button').click();
            cy.url().should('include', '&audiences=Health+Professionals');
            cy.go('back');
            cy.url().should('not.include', 'search');
        });

        it('Searchbar component routes properly on enter hit', () => {
            cy.get('#search-bar-input').type('breastfeeding').trigger('keydown', { keyCode: 13 });;
            cy.url().should('include', '&audiences=Health+Professionals');
            cy.get('[id^="filter-tag-remove-"]:visible:first').click();
            cy.get('#search-icon-button').click();
            cy.url().should('not.include', '&audiences=Health+Professionals');
        });

        it('Searchbar component routes properly on dropdown option click', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('[id^="searchbar-dropdown-suggestion-"]:first').click();
            cy.url().should('include', '&audiences=Health+Professionals');
        });

        it('Resources to support health professionals topic buttons route properly', () => {
            cy.get('[id^="topic-button-"]').eq(0).click();
            cy.url().should('include', 'audiences=Health+Professionals');
            cy.url().should('include', 'categories=growth+and+development');
            cy.get('#desktop-healthProfessionals').trigger('mouseover');
            cy.get('#resources-for-health-professionals').click();

            cy.get('[id^="topic-button-"]').eq(1).click();
            cy.url().should('include', 'audiences=Health+Professionals');
            cy.url().should('include', 'subcategories=allergies+and+intolerances');
            cy.get('#desktop-healthProfessionals').trigger('mouseover');
            cy.get('#resources-for-health-professionals').click();

            cy.get('[id^="topic-button-"]').eq(2).click();
            cy.url().should('include', 'audiences=Health+Professionals');
            cy.url().should('include', 'subcategories=cultural+eating+practices');
            cy.get('#desktop-healthProfessionals').trigger('mouseover');
            cy.get('#resources-for-health-professionals').click();
        });

        it('Build and share resources component works properly', () => {
            cy.get('#welcome-upload-resource').should('exist');
            cy.get('#welcome-upload-resource').click();
            cy.url().should('include', '/upload-a-resource');
            cy.get('#desktop-healthProfessionals').trigger('mouseover');
            cy.get('#resources-for-health-professionals').click();
            cy.get('#welcome-build-resource').should('exist');
            cy.get('#welcome-build-resource').click();
            cy.url().should('include', '/personalise-a-resource');
        });
        
        it('TitleAndRoute component exists and routes properly', () => {
            cy.get('#title-route-button-container').should('exist');
            cy.get('#title-route-button').should('exist');
            cy.get('#title-route-button').click();
            cy.url().should('include', '/?pathway=parents-and-families');
        });

        it('Grow and Go Toolbox philosophy modal displays properly', () => {
            cy.get('#modal-btn').click();
            cy.get('#vision-section').should('exist');
            cy.get('#aboutGGT-section').should('exist');
            cy.get('#funding-section').should('exist');
            cy.get('#rationale-section').should('exist');
            cy.get('#listening-section').should('exist');
            cy.get('#quality-section').should('exist');
            cy.get('#maintaining-section').should('exist');
        });
    });

    context('Mobile', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-healthProfessionals').click();
            cy.get('#resources-for-health-professionals').click();
            cy.url().should('include', 'pathway=health-professionals');            
        });

        it('Mobile: Searchbar component routes properly on search button click', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true });
            cy.get('#search-icon-button').click({ force: true });
            cy.url().should('include', '&audiences=Health+Professionals');
            cy.go('back');
            cy.url().should('not.include', 'search');
        });

        it('Mobile: Searchbar component routes properly on enter hit', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.url().should('include', '&audiences=Health+Professionals');
            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-tag-remove-"]:first').click({ force: true });
            cy.get('#search-icon-button').click({ force: true });
            cy.url().should('not.include', '&audiences=Health+Professionals');
        });

        it('Mobile: Searchbar component routes properly on dropdown option click', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true });
            cy.get('[id^="searchbar-dropdown-suggestion-"]:first').click({ force: true });
            cy.url().should('include', '&audiences=Health+Professionals');
        });

        it('Mobile: Resources to support health professionals topic buttons route properly', () => {
            cy.get('[id^="topic-button-"]').eq(0).click({ force: true });
            cy.url().should('include', 'audiences=Health+Professionals');
            cy.url().should('include', 'categories=growth+and+development');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-healthProfessionals').click();
            cy.get('#resources-for-health-professionals').click();

            cy.get('[id^="topic-button-"]').eq(1).click({ force: true });
            cy.url().should('include', 'audiences=Health+Professionals');
            cy.url().should('include', 'subcategories=allergies+and+intolerances');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-healthProfessionals').click();
            cy.get('#resources-for-health-professionals').click();

            cy.get('[id^="topic-button-"]').eq(2).click({ force: true });
            cy.url().should('include', 'audiences=Health+Professionals');
            cy.url().should('include', 'subcategories=cultural+eating+practices');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-healthProfessionals').click();
            cy.get('#resources-for-health-professionals').click();
        });

        it('Mobile: Build and share resources component works properly', () => {
            cy.get('#welcome-upload-resource').should('exist');
            cy.get('#welcome-upload-resource').click({ force: true });
            cy.url().should('include', '/upload-a-resource');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-healthProfessionals').click();
            cy.get('#resources-for-health-professionals').click(); 
            cy.get('#welcome-build-resource').should('exist');
            cy.get('#welcome-build-resource').click({ force: true });
            cy.url().should('include', '/personalise-a-resource');
        });
        
        it('Mobile: TitleAndRoute component exists and routes properly', () => {
            cy.get('#title-route-button-container').should('exist');
            cy.get('#title-route-button').should('exist');
            cy.get('#title-route-button').click({ force: true });
            cy.url().should('include', '/?pathway=parents-and-families');
        });

        it('Mobile: Grow and Go Toolbox philosophy modal displays properly', () => {
            cy.get('#modal-btn-mobile').click();
            cy.get('#vision-section').should('exist');
            cy.get('#aboutGGT-section').should('exist');
            cy.get('#funding-section').should('exist');
            cy.get('#rationale-section').should('exist');
            cy.get('#listening-section').should('exist');
            cy.get('#quality-section').should('exist');
            cy.get('#maintaining-section').should('exist');
        });
    });
});
