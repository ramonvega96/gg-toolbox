/// <reference types="cypress" />

describe('Parents and Families Page', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.viewport('macbook-15');
            cy.visit('/');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();
            cy.url().should('include', 'pathway=parents-and-families');
        });      

        it('Searchbar component routes properly on search button click', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('#search-icon-button').click();
            cy.url().should('include', '&audiences=Parents+And+Families');
            cy.go('back');
            cy.url().should('not.include', 'search');
        });

        it('Searchbar component routes properly on enter hit', () => {
            cy.get('#search-bar-input').type('breastfeeding').trigger('keydown', { keyCode: 13 });;
            cy.url().should('include', '&audiences=Parents+And+Families');
            cy.get('[id^="filter-tag-remove-"]:visible:first').click();
            cy.get('#search-icon-button').click();
            cy.url().should('not.include', '&audiences=Health+Professionals');
        });

        it('Searchbar component routes properly on dropdown option click', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('[id^="searchbar-dropdown-suggestion-"]:first').click();
            cy.url().should('include', '&audiences=Parents+And+Families');
        });

        it('Parents and families topic buttons route properly', () => {
            cy.get('[id^="topic-button-"]').eq(0).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=breastfeeding');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(1).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=formula+feeding');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(2).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'categories=introducing+solids');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(3).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'tagname=iron');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(4).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=recipes+and+meal+planning');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(5).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=fussy+eating');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(6).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=mealtime+environment');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(7).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=healthy+eating');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(8).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=healthy+drinks');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(9).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=healthy+habits+and+healthy+growth');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(10).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=allergies+and+intolerances');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(11).click();
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=tummy%2C+gut+and+mouth+problems');
            cy.get('#desktop-parentsAndFamilies').click().trigger('mouseover');
            cy.get('#resources-for-all-parents-and-families').click();
        });
    });

    context('Mobile', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();
            cy.url().should('include', 'pathway=parents-and-families');
        });

        it('Mobile: Searchbar component routes properly on search button click', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true });
            cy.get('#search-icon-button').click({ force: true });
            cy.url().should('include', '&audiences=Parents+And+Families');
            cy.go('back');
            cy.url().should('not.include', 'search');
        });

        it('Mobile: Searchbar component routes properly on enter hit', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.url().should('include', '&audiences=Parents+And+Families');
            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-tag-remove-"]:first').click({ force: true });
            cy.get('#search-icon-button').click({ force: true });
            cy.url().should('not.include', '&audiences=Health+Professionals');
        });

        it('Mobile: Searchbar component routes properly on dropdown option click', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true });
            cy.get('[id^="searchbar-dropdown-suggestion-"]:first').click({ force: true });
            cy.url().should('include', '&audiences=Parents+And+Families');
        });

        it('Mobile: Parents and families topic buttons route properly', () => {
            cy.get('[id^="topic-button-"]').eq(0).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=breastfeeding');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(1).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=formula+feeding');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(2).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'categories=introducing+solids');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(3).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'tagname=iron');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(4).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=recipes+and+meal+planning');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(5).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=fussy+eating');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(6).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=mealtime+environment');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(7).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=healthy+eating');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(8).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=healthy+drinks');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(9).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=healthy+habits+and+healthy+growth');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(10).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=allergies+and+intolerances');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();

            cy.get('[id^="topic-button-"]').eq(11).click({ force: true });
            cy.url().should('include', 'audiences=Parents+And+Families');
            cy.url().should('include', 'subcategories=tummy%2C+gut+and+mouth+problems');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-parentsAndFamilies').click();
            cy.get('#resources-for-all-parents-and-families').click();
        });
    });
});
