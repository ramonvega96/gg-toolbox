/// <reference types="cypress" />

describe('Lumpy Road To Solids Tiny Bites', () => {
    context('Desktop', () => {
        beforeEach(() => {            
            cy.viewport('macbook-15');
            cy.visit('/digital-resources/lumpy-road-to-solids-tb');
        });

        it('Digital resource container should be displayed', () => {
            cy.get('.bg-tb-road').should('exist');
        });

        it('Should display all developmental stages', () => {
            cy.get('[data-cy="road-stage"]').its('length').should('eq', 15);
        });

        it('Should display developmental stages with all of their components', () => {
            cy.get('[data-cy="road-stage"]').each(($el, index) => {
                cy.wrap($el).find('[data-cy="stage-name-bubble"]').should('exist');
                cy.wrap($el).find('[data-cy="stage-connector"]').should('exist');
                cy.wrap($el).find('[data-cy="stage-overview"]').should('exist');
                cy.wrap($el).find('[data-cy="stage-first-img"]').should('exist');
                cy.wrap($el).find('[data-cy="stage-fom-btn"]').should('exist');
                if(index > 1) cy.wrap($el).find('[data-cy="stage-second-img"]').should('exist');
            });
        });

        it('Should fix routing on modal open, interaction and close', () => {
            cy.get('[data-cy="modal-btn"]').eq(1).click();
            cy.get('[data-cy="stage-fom-btn"]:visible').each(($stg, stgIndex) => {
                cy.get($stg).click();
                cy.url().should('include', `stg=${stgIndex}`);
                cy.get('[data-cy="accordion-btn"]').each(($acc, accIndex) => {
                    cy.get($acc).click();
                    cy.url().should('include', `stg=${stgIndex}&acc=${accIndex}`);
                    cy.get($acc).click();
                    cy.url().should('not.include', 'acc');
                });
                cy.get('#x-button').click();
                cy.url().should('not.include', 'stg');
            });
        });

        it('Should send analitics data properly', () => {
            cy.get('#emailAddress').type('test@user.com');
            cy.get('[data-cy="modal-btn"]').eq(0).click();            
            cy.get('[data-cy="stage-fom-btn"]:visible').eq(0).click();
            cy.get('#x-button').click();
            
            cy.intercept('POST', '/analytics/lrsTbAnalitycs').as('newAnalitycsRecord');

            const assertAnalyticsRecord = (interception, location) => {
                expect(interception.request.body.user).to.equal('test@user.com');
                expect(interception.request.body.location).to.equal(location);
                expect(interception.request.body.duration).to.be.a('number');
                expect(interception.request.body.date).to.be.a('string');
                expect(interception.request.body.time).to.be.a('string');
                expect(interception.request.body.sessionId).to.be.a('string');
            };

            cy.get('[data-cy="stage-fom-btn"]:visible').each(($stg, stgIndex) => {
                cy.get($stg).click();
                cy.wait('@newAnalitycsRecord').then((interception) => {
                    assertAnalyticsRecord(interception, '/digital-resources/lumpy-road-to-solids-tb');
                });                
                cy.url().should('include', `stg=${stgIndex}`);
                cy.get('[data-cy="accordion-btn"]').each(($acc, accIndex) => {                    
                    cy.get($acc).click();
                    cy.wait('@newAnalitycsRecord').then((interception) => {
                        assertAnalyticsRecord(interception, `/digital-resources/lumpy-road-to-solids-tb?stg=${stgIndex}`);
                    });                    
                    cy.url().should('include', `stg=${stgIndex}&acc=${accIndex}`);                    
                    cy.get($acc).click();
                    cy.wait('@newAnalitycsRecord').then((interception) => {
                        assertAnalyticsRecord(interception,`/digital-resources/lumpy-road-to-solids-tb?stg=${stgIndex}&acc=${accIndex}`);
                    });                    
                    cy.url().should('not.include', 'acc');
                });                
                cy.get('#x-button').click();
                cy.wait('@newAnalitycsRecord').then((interception) => {
                    assertAnalyticsRecord(interception,`/digital-resources/lumpy-road-to-solids-tb?stg=${stgIndex}`);
                });
                cy.url().should('not.include', 'stg');
            });
        });
    });

    context('Mobile View', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/digital-resources/lumpy-road-to-solids-tb');
        });

        it('Digital resource container should be displayed', () => {
            cy.get('.bg-tb-road-mobile').should('exist');
        });

        it('Should display all developmental stages', () => {
            cy.get('[data-cy="road-stage-mobile"]').its('length').should('eq', 15);
        });

        it('Should display developmental stages with all of their components', () => {
            cy.get('[data-cy="road-stage-mobile"]').each(($el, index) => {
                cy.wrap($el).find('[data-cy="stage-name-bubble"]').should('exist');
                cy.wrap($el).find('[data-cy="stage-connector"]').should('exist');
                cy.wrap($el).find('[data-cy="stage-overview"]').should('exist');
                cy.wrap($el).find('[data-cy="stage-first-img"]').should('exist');
                cy.wrap($el).find('[data-cy="stage-fom-btn"]').should('exist');
                if(index > 1) cy.wrap($el).find('[data-cy="stage-second-img"]').should('exist');
            });
        });

        it('Should fix routing on modal open, interaction and close', () => {
            cy.get('[data-cy="modal-btn"]').eq(1).click();
            cy.get('[data-cy="stage-fom-btn"]:visible').each(($stg, stgIndex) => {
                cy.get($stg).click({force: true});
                cy.url().should('include', `stg=${stgIndex}`);
                cy.get('[data-cy="accordion-btn"]').each(($acc, accIndex) => {
                    cy.get($acc).click({force: true});
                    cy.url().should('include', `stg=${stgIndex}&acc=${accIndex}`);
                    cy.get($acc).click({force: true});
                    cy.url().should('not.include', 'acc');
                });
                cy.get('#x-button').click({force: true});
                cy.url().should('not.include', 'stg');
            });
        });

        it('Should send analitics data properly', () => {
            cy.get('#emailAddress').type('test@user.com');
            cy.get('[data-cy="modal-btn"]').eq(0).click();            
            cy.get('[data-cy="stage-fom-btn"]:visible').eq(0).click();
            cy.get('#x-button').click();
            
            cy.intercept('POST', '/analytics/lrsTbAnalitycs').as('newAnalitycsRecord');

            const assertAnalyticsRecord = (interception, location) => {
                expect(interception.request.body.user).to.equal('test@user.com');
                expect(interception.request.body.location).to.equal(location);
                expect(interception.request.body.duration).to.be.a('number');
                expect(interception.request.body.date).to.be.a('string');
                expect(interception.request.body.time).to.be.a('string');
                expect(interception.request.body.sessionId).to.be.a('string');
            };

            cy.get('[data-cy="stage-fom-btn"]:visible').each(($stg, stgIndex) => {
                cy.get($stg).click();
                cy.wait('@newAnalitycsRecord').then((interception) => {
                    assertAnalyticsRecord(interception, '/digital-resources/lumpy-road-to-solids-tb');
                });                
                cy.url().should('include', `stg=${stgIndex}`);
                cy.get('[data-cy="accordion-btn"]').each(($acc, accIndex) => {                    
                    cy.get($acc).click();
                    cy.wait('@newAnalitycsRecord').then((interception) => {
                        assertAnalyticsRecord(interception, `/digital-resources/lumpy-road-to-solids-tb?stg=${stgIndex}`);
                    });                    
                    cy.url().should('include', `stg=${stgIndex}&acc=${accIndex}`);                    
                    cy.get($acc).click();
                    cy.wait('@newAnalitycsRecord').then((interception) => {
                        assertAnalyticsRecord(interception,`/digital-resources/lumpy-road-to-solids-tb?stg=${stgIndex}&acc=${accIndex}`);
                    });                    
                    cy.url().should('not.include', 'acc');
                });                
                cy.get('#x-button').click();
                cy.wait('@newAnalitycsRecord').then((interception) => {
                    assertAnalyticsRecord(interception,`/digital-resources/lumpy-road-to-solids-tb?stg=${stgIndex}`);
                });
                cy.url().should('not.include', 'stg');
            });
        });
    });
});
