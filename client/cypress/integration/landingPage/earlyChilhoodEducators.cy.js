/// <reference types="cypress" />

describe('Early Chilhood Educators Page', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.viewport('macbook-15');
            cy.visit('/');
            cy.get('#desktop-earlyChildhoodEducation').trigger('mouseover');
            cy.get('#resources-for-early-childhood-educators').click();
            cy.url().should('include', 'pathway=early-childhood-education');
        });      

        it('Searchbar component routes properly on search button click', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('#search-icon-button').click();
            cy.url().should('include', '&audiences=Education+Professionals');
            cy.go('back');
            cy.url().should('not.include', 'search');
        });

        it('Searchbar component routes properly on enter hit', () => {
            cy.get('#search-bar-input').type('breastfeeding').trigger('keydown', { keyCode: 13 });
            cy.url().should('include', '&audiences=Education+Professionals');
            cy.get('[id^="filter-tag-remove-"]:visible:first').click();
            cy.get('#search-icon-button').click();
            cy.url().should('not.include', '&audiences=Health+Professionals');
        });

        it('Searchbar component routes properly on dropdown option click', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('[id^="searchbar-dropdown-suggestion-"]:first').click();
            cy.url().should('include', '&audiences=Education+Professionals');
        });

        it('Button to parents and families routes properly', () => {
            cy.get('[id="title-route-button"]').eq(0).click();
            cy.url().should('include', 'pathway=parents-and-families');
        });

        it('Button to professional development opportunities routes properly', () => {
            cy.get('[id="title-route-button"]').eq(1).click();
            cy.url().should('include', 'search?h=true&audiences=Education+Professionals&resourceTypes=Professional+Development+Courses');
        });

        it('Button to professional development podcast routes properly', () => {
            cy.get('#go-to-pd-podcast').click();
            cy.url().should('include', '/G&G-podcast');
        });

        it('All states in HomeMapComponent display a modal with adequate buttons', () => {
            cy.get('#NT').scrollIntoView();
            cy.get('#NT').click();
            cy.get('#modal-container').should('be.visible');
            cy.get('#state-description').should('be.visible');
            cy.get('#modal-button-0').should('be.visible');
            cy.get('#modal-button-1').should('be.visible');
            cy.get('#x-button').click();
            cy.get('#NSW').scrollIntoView();
            cy.get('#NSW').click();
            cy.get('#modal-container').should('be.visible');
            cy.get('#state-description').should('be.visible');
            cy.get('#modal-button-0').should('be.visible');
            cy.get('#modal-button-1').should('be.visible');
            cy.get('#x-button').click();
            cy.get('#ACT').scrollIntoView();
            cy.get('#ACT').click();
            cy.get('#modal-container').should('be.visible');
            cy.get('#state-description').should('be.visible');
            cy.get('#modal-button-0').should('be.visible');
            cy.get('#modal-button-1').should('be.visible');
            cy.get('#x-button').click();
            cy.get('#VIC').scrollIntoView();
            cy.get('#VIC').click();
            cy.get('#modal-container').should('be.visible');
            cy.get('#state-description').should('be.visible');
            cy.get('#modal-button-0').should('be.visible');
            cy.get('#modal-button-1').should('be.visible');
            cy.get('#x-button').click();
            cy.get('#TAS').scrollIntoView();
            cy.get('#TAS').click();
            cy.get('#modal-container').should('be.visible');
            cy.get('#state-description').should('be.visible');
            cy.get('#modal-button-0').should('be.visible');
            cy.get('#modal-button-1').should('be.visible');
            cy.get('#x-button').click();
        });

        it('Relevant topics for you and colleagues topic buttons route properly', () => {
            cy.get('[id^="topic-button-"]').eq(0).click();
            cy.url().should('include', 'audiences=Education+Professionals');
            cy.url().should('include', 'subcategories=fussy+eating%3Bmealtime+environment');
            cy.get('#desktop-earlyChildhoodEducation').trigger('mouseover');
            cy.get('#resources-for-early-childhood-educators').click();

            cy.get('[id^="topic-button-"]').eq(1).click();
            cy.url().should('include', 'audiences=Education+Professionals');
            cy.url().should('include', 'categories=healthy+lifestyle');
            cy.get('#desktop-earlyChildhoodEducation').trigger('mouseover');
            cy.get('#resources-for-early-childhood-educators').click();

            cy.get('[id^="topic-button-"]').eq(2).click();
            cy.url().should('include', 'audiences=Education+Professionals');
            cy.url().should('include', 'subcategories=menu+planning');
            cy.get('#desktop-earlyChildhoodEducation').trigger('mouseover');
            cy.get('#resources-for-early-childhood-educators').click();
        });
    });

    context('Mobile', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-earlyChildhoodEducation').click();
            cy.get('#resources-for-early-childhood-educators').click();
            cy.url().should('include', 'pathway=early-childhood-education');            
        });

        it('Mobile: Searchbar component routes properly on search button click', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true });
            cy.get('#search-icon-button').click({ force: true });
            cy.url().should('include', '&audiences=Education+Professionals');
            cy.go('back');
            cy.url().should('not.include', 'search');
        });

        it('Mobile: Searchbar component routes properly on enter hit', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.url().should('include', '&audiences=Education+Professionals');
            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-tag-remove-"]:first').click({ force: true });
            cy.get('#search-icon-button').click({ force: true });
            cy.url().should('not.include', '&audiences=Health+Professionals');
        });

        it('Mobile: Searchbar component routes properly on dropdown option click', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true });
            cy.get('[id^="searchbar-dropdown-suggestion-"]:first').click({ force: true });
            cy.url().should('include', '&audiences=Education+Professionals');
        });

        it('Mobile: Button to parents and families routes properly', () => {
            cy.get('[id="title-route-button"]').eq(0).click({ force: true });
            cy.url().should('include', 'pathway=parents-and-families');
        });

        it('Mobile: Button to professional development opportunities routes properly', () => {
            cy.get('[id="title-route-button"]').eq(1).click({ force: true });
            cy.url().should('include', 'search?h=true&audiences=Education+Professionals&resourceTypes=Professional+Development+Courses');
        });

        it('Mobile: Button to professional development podcast routes properly', () => {
            cy.get('#go-to-pd-podcast').click({ force: true });
            cy.url().should('include', '/G&G-podcast');
        });

        it('Mobile: All states in HomeMapComponent display a modal with adequate buttons', () => {
            cy.get('#NT-text').click({ force: true });
            cy.get('#modal-container').should('be.visible');
            cy.get('#state-description').should('be.visible');
            cy.get('#modal-button-0').should('be.visible');
            cy.get('#modal-button-1').should('be.visible');
            cy.get('#x-button').click();
            cy.get('#NSW-text').click({ force: true });
            cy.get('#modal-container').should('be.visible');
            cy.get('#state-description').should('be.visible');
            cy.get('#modal-button-0').should('be.visible');
            cy.get('#modal-button-1').should('be.visible');
            cy.get('#x-button').click();
            cy.get('#ACT-text').click({ force: true });
            cy.get('#modal-container').should('be.visible');
            cy.get('#state-description').should('be.visible');
            cy.get('#modal-button-0').should('be.visible');
            cy.get('#modal-button-1').should('be.visible');
            cy.get('#x-button').click();
            cy.get('#VIC-text').click({ force: true });
            cy.get('#modal-container').should('be.visible');
            cy.get('#state-description').should('be.visible');
            cy.get('#modal-button-0').should('be.visible');
            cy.get('#modal-button-1').should('be.visible');
            cy.get('#x-button').click();
            cy.get('#TAS-text').click({ force: true });
            cy.get('#modal-container').should('be.visible');
            cy.get('#state-description').should('be.visible');
            cy.get('#modal-button-0').should('be.visible');
            cy.get('#modal-button-1').should('be.visible');
            cy.get('#x-button').click();
        });

        it('Mobile: Relevant topics for you and colleagues topic buttons route properly', () => {
            cy.get('[id^="topic-button-"]').eq(0).click({ force: true });
            cy.url().should('include', 'audiences=Education+Professionals');
            cy.url().should('include', 'subcategories=fussy+eating%3Bmealtime+environment');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-earlyChildhoodEducation').click();
            cy.get('#resources-for-early-childhood-educators').click(); 

            cy.get('[id^="topic-button-"]').eq(1).click({ force: true });
            cy.url().should('include', 'audiences=Education+Professionals');
            cy.url().should('include', 'categories=healthy+lifestyle');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-earlyChildhoodEducation').click();
            cy.get('#resources-for-early-childhood-educators').click(); 

            cy.get('[id^="topic-button-"]').eq(2).click({ force: true });
            cy.url().should('include', 'audiences=Education+Professionals');
            cy.url().should('include', 'subcategories=menu+planning');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-earlyChildhoodEducation').click();
            cy.get('#resources-for-early-childhood-educators').click(); 
        });
    });
});
