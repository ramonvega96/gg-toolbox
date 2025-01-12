/// <reference types="cypress" />

describe('FHP Allied Health Professional Help Page', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.viewport('macbook-15');
            cy.visit('/find-a-health-professional');
            cy.get('#next-button').click();
            cy.get('#info-card-description-button-pathway-allied-health-professional').click({force: true});
        });

        const statesIds = ['QLD','NT','WA','SA','NSW', 'ACT', 'VIC', 'TAS'];

        it('Header and grids should exists', () => {
            statesIds.forEach(stateId => {
                cy.get(`#${stateId}`).click();
                cy.get('#need-help-title').should('exist');
                cy.get('#title-button-grid-container').should('exist');
                cy.get('#i-know-what-hp-see-container').click({force: true});
                cy.get('#i-know-what-hp-see-grid').should('exist');
                cy.get('#go-back').click();
            });
        });

        it('Topics grid works properly', () => {
            statesIds.forEach(stateId => {
                cy.get(`#${stateId}`).click();
                cy.get('[id^="topic-button-"]').should('have.length', 9)
                    .each(($topicButton) => {
                        cy.get(`#${$topicButton.attr('id')}`).click();
                        cy.get('#suggested-container').should('exist');
                        cy.get('#tips-modal-btn').click();
                        cy.get('#modal-container').should('be.visible');
                        cy.get('#x-button').click();
                        cy.get('#laptop-resource-slider').should('exist');
                        cy.get('[id^="accordion-heading-"]')
                            .should('have.length.greaterThan', 0)
                            .each(($accordionComponent) => {
                                cy.get(`#${$accordionComponent.attr('id')}`).click();
                                cy.get('[id^="display-profession-"]').should('exist');
                                cy.get('[id^="profession-title-"]').should('not.exist');
                                cy.get('[id^="profession-description-"]').should('exist');                    
                                cy.get(`#${$accordionComponent.attr('id')}`).click();
                            });
                        cy.get('#go-back').click();
                    });
                cy.get('#go-back').click();
            });
        });

        it('Health professionals grid works properly', () => {
            statesIds.forEach(stateId => {
                cy.get(`#${stateId}`).click();
                cy.get('#i-know-what-hp-see-container').click({force: true});
                cy.get('[id^="hp-topic-button-"]')
                    .should('have.length', 8)
                    .each(($hpButton) => {
                        cy.get(`#${$hpButton.attr('id')}`).click({force: true});
                        cy.get('#profession-display-component').should('be.visible');
                        cy.get('body').then(($body) => {
                            if ($body.find('#related-professions-accordion').length) {
                                cy.get('[id^="accordion-heading-"]')
                                    .should('have.length.greaterThan', 1)
                                    .each(($accordionComponent) => {
                                        cy.get(`#${$accordionComponent.attr('id')}`).click();
                                        cy.get('[id^="display-profession-"]').should('exist');
                                        cy.get('[id^="profession-title-"]').should('not.exist');
                                        cy.get('[id^="profession-description-"]').should('exist');                    
                                        cy.get(`#${$accordionComponent.attr('id')}`).click();
                                    }); 
                            }
                            else{
                                cy.get('[id^="display-profession-"]').should('exist');
                                cy.get('[id^="profession-title-"]').should('exist');
                                cy.get('[id^="profession-description-"]').should('exist');
                            }
                        });                        
                        cy.get('#go-back').click();
                        cy.get('#i-know-what-hp-see-container').click();
                    });
                    cy.get('#go-back').click();
            });            
        });

        it('Back button working', () => {
            cy.get('#go-back').click();
            cy.get('#info-card-description-button-pathway-allied-health-professional').should('exist');
        });

        it.only('Exit button routing working as expected', () => {
            cy.visit('/?pathway=grow-and-go');
            cy.get('#sc-btn-text').click();
            cy.get('#exit-button').click();
            cy.url().should('include', `pathway=grow-and-go`);
            cy.visit('/?pathway=health-professionals');
            cy.get('#sc-btn-text').click();
            cy.get('#exit-button').click();
            cy.url().should('include', `pathway=health-professionals`);            
            cy.visit('/?pathway=parents-and-families');
            cy.get('#sc-btn-text').click();
            cy.get('#exit-button').click();
            cy.url().should('include', `pathway=parents-and-families`);            
            cy.visit('/?pathway=aboriginal-and-torres-strait&scrollTo=educators');
            cy.get('[id="sc-btn-text"]').eq(1).click();
            cy.get('#exit-button').click();
            cy.url().should('include', `pathway=aboriginal-and-torres-strait&scrollTo=educators`);
            cy.visit('/?pathway=early-childhood-education');
            cy.get('#sc-btn-text').click();
            cy.get('#exit-button').click();
            cy.url().should('include', `pathway=early-childhood-education`);
            cy.visit('/?pathway=multicultural-resources');
            cy.get('#sc-btn-text').click();
            cy.get('#exit-button').click();
            cy.url().should('include', `pathway=multicultural-resources`);
        });
    });
});

