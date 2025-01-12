/// <reference types="cypress" />

describe('FHP second page testing', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.visit('/find-a-health-professional');
            cy.get('#next-button').click();
            cy.viewport('macbook-15');
        });

        it('Header exists', () => {
            cy.get('#info-header-text').should('exist');
        });

        it('Desktop professions exists', () => {
            cy.get('#info-card-container').should('exist');
        });

        it('Aus pop up modal exists', () => {
            cy.get('#how-does-healthcare-wrk-btn').click();
            cy.get('#modal-background').should('exist');
            cy.get('#x-button').click();
        });

        it('Aus pop up tabs work', () => {
            cy.get('#how-does-healthcare-wrk-btn').click();

            cy.get('#public-hospitals').click();
            cy.contains('div', 'Public hospitals provide free health care for any one with a Medicare number. In a public hospital your child can see:').should('exist');

            cy.get('#community-health').click();
            cy.contains('div', 'Community health centres are found outside of public hospitals and provide health care to local areas. Community health care is usually free or low cost.').should('exist');

            cy.get('#private-services').click();
            cy.contains('div', 'You can access health professionals in private clinics and some private hospitals by paying a fee. If you have health insurance you may be covered for some of the private clinic fee, but you may still need to pay an ').should('exist');

            cy.get('#national-disability-insurance-scheme-ndis').click();
            cy.contains('div', 'Some children and adults with a disability can access health care through the NDIS.').should('exist');
        });

        it('Maternal modal exists', () => {
            cy.get('#info-card-description-button-topics-maternal-child-and-family-health-nurse').click({force: true});
            cy.get('#modal-background').should('exist');
            cy.get('h3').should('exist');
            cy.get('ul').should('exist');
            cy.get('#x-button').click();
        });

        it('AHP modal exists', () => {
            cy.get('#info-card-description-button-topics-allied-health-professional').click({force: true});
            cy.get('#modal-background').should('exist');
            cy.get('h3').should('exist');
            cy.get('ul').should('exist');
            cy.get('#x-button').click();
        });

        it('Back button working', () => {
            cy.get('#go-back').click();
            cy.get('#FHP-default-bg').should('exist');
        });
    });

    context('Mobile', () => {
        beforeEach(() => {
            cy.visit('/find-a-health-professional');
            cy.viewport('iphone-6');
            cy.get('#next-button').click();
        });


        it('Accordions exist', () => {
            cy.get('#accordion-find-help-container').should('exist');
        });

        it('Accordions works', () => {
            cy.get('#accordion-toggle-info-icon').click();
            cy.get('#hp-accordion-description').should('exist');
        });
    });
});
