/// <reference types="cypress" />

describe('Navigation Bar', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.viewport('macbook-15');
        });

        it('Header exists', () => {
            cy.get('#desktop-navBar').should('exist');
        });

        it('Logo exists in header', () => {
            cy.get('#desktop-growAndGo').should('exist');
        });

        it('Health Professionals category exists in header', () => {
            cy.get('#desktop-healthProfessionals').should('exist');
        });

        it('Parents & Carers category exists in header', () => {
            cy.get('#desktop-parentsAndFamilies').should('exist');
        });

        it('Early Childhood Education & Care category exists in header', () => {
            cy.get('#desktop-earlyChildhoodEducation').should('exist');
        });

        it('Multicultural Resources category exists in header', () => {
            cy.get('#desktop-multiculturalResources').should('exist');
        });

        it('Grow & Go Resources category exists in header', () => {
            cy.get('#desktop-growGoToolbox').should('exist');
        });

        it('Logo routes to landing page on click', () => {
            cy.get('#desktop-growAndGo').find('#grow-and-go-logo').click();
            cy.get('#desktop-healthProfessionals').click();
            cy.url().should('include', '/');
        });

        it('Health Professionals category routes to Health Professionals page on click', () => {
            cy.get('#desktop-healthProfessionals').trigger('mouseover');
            cy.get('#resources-for-health-professionals').click();
            cy.contains('h1', 'Health Professionals').should('exist');
        });

        it('Dropdown should appear on hover', () => {
            cy.get('#desktop-healthProfessionals').trigger('mouseover');
            cy.get('#categoryDropdown').should('exist');
        });

        it('Dropdown should disappear on mouseout', () => {
            cy.get('#desktop-healthProfessionals').trigger('mouseover');
            cy.get('#desktop-healthProfessionals').trigger('mouseout');
            cy.get('#categoryDropdown').should('not.exist');
        });

        it('General Population dropdown button should route to category page on click', () => {
            cy.get('#desktop-healthProfessionals').trigger('mouseover');
            cy.get('#resources-for-health-professionals').click();
            cy.contains('h1', 'Health Professionals').should('exist');
        });

        it('Health Professionals development dropdown button should route to searchbar', () => {
            cy.get('#desktop-healthProfessionals').trigger('mouseover');
            cy.get('#professional-development-for-health-professionals').click();
            cy.url().should('include', '/search?h=true&audiences=Health+Professionals&resourceTypes=Professional+Development+Courses');
        });

        it('Build a resource dropdown button should route to build a resource page on click', () => {
            cy.get('#desktop-healthProfessionals').trigger('mouseover');
            cy.get('#personalise-a-resource').click();
            cy.url().should('include', '/personalise-a-resource');
        });

        it('Aboriginal & Torres Strait Islander Peoples dropdown button should route to ATSI page on click', () => {
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();
            cy.contains(
                'span',
                'Explore resources for Aboriginal and Torres Strait Islander peoples.'
            ).should('exist');
        });

        it('Find a health professional dropdown button should route to find a health professional page on click', () => {
            cy.get('#desktop-parentsAndFamilies').trigger('mouseover');
            cy.get('#find-a-health-professional').click();
            cy.url().should('include', '/find-a-health-professional');
        });

        it('Go & Grow professional development podcast dropdown button should route to professional development podcast page on click', () => {
            cy.get('#desktop-earlyChildhoodEducation').trigger('mouseover');
            cy.get('#the-grow-and-go-podcast-nutrition-in-early-childhood-education-and-care').click();
            cy.url().should('include', '/G&G-podcast');
        });

        it('Early childhood education professional development dropdown button should route to searchbar', () => {
            cy.get('#desktop-earlyChildhoodEducation').trigger('mouseover');
            cy.get('#early-childhood-education-professional-development').click();
            cy.url().should('include', '/search?h=true&audiences=Education+Professionals&resourceTypes=Professional+Development+Courses');
        });

        it('Our resources dropdown button should route to Grow & Go Resource Page', () => {
            cy.get('#desktop-growGoToolbox').trigger('mouseover');
            cy.get('#our-resources').click();
            cy.contains('h1', 'The Grow & Go Toolbox resources').should('exist');
        });

        it('Browse resource categories dropdown button should route to Browse These Categories Page', () => {
            cy.get('#desktop-growGoToolbox').trigger('mouseover');
            cy.get('#browse-resource-categories').click();
            cy.contains('h1', 'Browse these categories').should('exist');
        });

        it('About us dropdown button should route to About Us Page', () => {
            cy.get('#desktop-growGoToolbox').trigger('mouseover');
            cy.get('#about-us').click();
            cy.url().should('include', '/about-us');
        });
    });
});
