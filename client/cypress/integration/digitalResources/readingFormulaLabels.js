/// <reference types="cypress" />

describe('Reading Formula Labels', () => {
    context('Desktop', () => {
        beforeEach(() => {            
            cy.viewport('macbook-15');
            cy.visit('/digital-resources/reading-formula-labels');
        });

        it('Layout displays properly', () => {
            cy.get('[data-cy="resource-title"]').should('exist');
            cy.get('[data-cy="resource-subtitle"]').should('exist');
            cy.get('[data-cy="resource-main-text"]').should('exist');
            cy.get('[data-cy="modal-btn"]').its('length').should('eq', 3);
            cy.get('[data-cy="allegies-title"]').should('exist');
            cy.get('[data-cy="allegies-paragraph-1"]').should('exist');
            cy.get('[data-cy="allegies-paragraph-2"]').should('exist');
            cy.get('[data-cy="allegies-paragraph-3"]').should('exist');
            cy.get('[data-cy="allegies-btn-1"]').should('exist');
            cy.get('[data-cy="allegies-btn-2"]').should('exist');
        });

        it('Instructions display properly', () => {
            cy.get('[data-cy="resource-instructions"]').should('exist');
            cy.get('[data-cy="flip-img-btn"]').should('exist');
            cy.get('[data-cy="flip-img-btn"]').trigger('mouseenter');
            cy.get('#flip-img-tooltip').should('be.visible');
        });

        it('Flips interactive image properly', () => {
            cy.get('[data-cy="interactive-img"]').then(($img) => {
                const initialSrc = $img.attr('src');
                cy.get('[data-cy="flip-img-btn"').click();
                cy.get('[data-cy="interactive-img"]').invoke('attr', 'src').then((newSrc) => {
                    expect(newSrc).not.to.equal(initialSrc);
                });
            });
        });

        it('Label carousels display properly', () => {
            cy.get('[data-cy="label-carousel-1"]').should('exist');
            cy.get('[data-cy="label-carousel-2"]').should('exist');
            cy.get('[data-cy="label-carousel-3"]').should('exist');
        });

        it('First label carousel works properly', () => {
            cy.get('[data-cy="tin-carousel-1-label-0"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(0).trigger('mouseenter');
            cy.get('#tin-carousel-1-tooltip-0').should('exist');
            cy.get('[data-cy="carousel-btn-next"').eq(0).click();
            cy.get('[data-cy="tin-carousel-1-label-1"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(0).trigger('mouseenter');
            cy.get('#tin-carousel-1-tooltip-1').should('exist');
            cy.get('[data-cy="carousel-btn-previous"').eq(0).click();
            cy.get('[data-cy="tin-carousel-1-label-0"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(0).trigger('mouseenter');
            cy.get('#tin-carousel-1-tooltip-0').should('exist');            
        });

        it('Second label carousel works properly', () => {
            cy.get('[data-cy="tin-carousel-2-label-0"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(1).trigger('mouseenter');
            cy.get('#tin-carousel-2-tooltip-0').should('exist');
            cy.get('[data-cy="carousel-btn-next"').eq(1).click();
            cy.get('[data-cy="tin-carousel-2-label-1"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(1).trigger('mouseenter');
            cy.get('#tin-carousel-2-tooltip-1').should('exist');
            cy.get('[data-cy="carousel-btn-previous"').eq(1).click();
            cy.get('[data-cy="tin-carousel-2-label-0"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(1).trigger('mouseenter');
            cy.get('#tin-carousel-2-tooltip-0').should('exist');            
        });

        it('Third label carousel works properly', () => {
            cy.get('[data-cy="tin-carousel-3-label-0"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(2).trigger('mouseenter');
            cy.get('#tin-carousel-3-tooltip-0').should('exist');
            cy.get('[data-cy="carousel-btn-next"').eq(2).click();
            cy.get('[data-cy="tin-carousel-3-label-1"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(2).trigger('mouseenter');
            cy.get('#tin-carousel-3-tooltip-1').should('exist');
            cy.get('[data-cy="carousel-btn-previous"').eq(2).click();
            cy.get('[data-cy="tin-carousel-3-label-0"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(2).trigger('mouseenter');
            cy.get('#tin-carousel-3-tooltip-0').should('exist');            
        });
    });

    context('Mobile View', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/digital-resources/reading-formula-labels');
        });

        it('Mobile: Layout displays properly', () => {
            cy.get('[data-cy="resource-title"]').should('exist');
            cy.get('[data-cy="resource-subtitle"]').should('exist');
            cy.get('[data-cy="resource-main-text"]').should('exist');
            cy.get('[data-cy="modal-btn"]').its('length').should('eq', 3);
            cy.get('[data-cy="allegies-title"]').should('exist');
            cy.get('[data-cy="allegies-paragraph-1"]').should('exist');
            cy.get('[data-cy="allegies-paragraph-2"]').should('exist');
            cy.get('[data-cy="allegies-paragraph-3"]').should('exist');
            cy.get('[data-cy="allegies-btn-1"]').should('exist');
            cy.get('[data-cy="allegies-btn-2"]').should('exist');
        });

        it('Mobile: Instructions display properly', () => {
            cy.get('[data-cy="resource-instructions"]').should('exist');
            cy.get('[data-cy="flip-img-btn"]').should('exist');
            cy.get('[data-cy="flip-img-btn"]').trigger('mouseenter');
            cy.get('#flip-img-tooltip').should('be.visible');
        });

        it('Mobile: Flips interactive image properly', () => {
            cy.get('[data-cy="interactive-img"]').then(($img) => {
                const initialSrc = $img.attr('src');
                cy.get('[data-cy="flip-img-btn"').click({force: true});
                cy.get('[data-cy="interactive-img"]').invoke('attr', 'src').then((newSrc) => {
                    expect(newSrc).not.to.equal(initialSrc);
                });
            });
        });

        it('Mobile: Label carousels display properly', () => {
            cy.get('[data-cy="label-carousel-1"]').should('exist');
            cy.get('[data-cy="label-carousel-2"]').should('exist');
            cy.get('[data-cy="label-carousel-3"]').should('exist');
        });

        it('Mobile: First label carousel works properly', () => {
            cy.get('[data-cy="carousel-btn-next"').eq(0).click({force: true});
            cy.get('[data-cy="tin-carousel-1-label-1"').should('be.visible');
            cy.get('[data-cy="carousel-info-btn"]').eq(0).click({force: true});
            cy.get('#tin-carousel-1-tooltip-1').should('be.visible');
            cy.get('[data-cy="carousel-btn-previous"').eq(0).click({force: true});
            cy.get('[data-cy="tin-carousel-1-label-0"').should('be.visible');
            cy.get('[data-cy="carousel-info-btn"]').eq(0).click({force: true});
            cy.get('#tin-carousel-1-tooltip-0').should('exist');            
        });

        it('Mobile: Second label carousel works properly', () => {
            cy.get('[data-cy="carousel-btn-next"').eq(1).click({force: true});
            cy.get('[data-cy="tin-carousel-2-label-1"').should('be.visible');
            cy.get('[data-cy="carousel-info-btn"]').eq(1).click({force: true});
            cy.get('#tin-carousel-2-tooltip-1').should('be.visible');
            cy.get('[data-cy="carousel-btn-previous"').eq(1).click({force: true});
            cy.get('[data-cy="tin-carousel-2-label-0"').should('be.visible');
            cy.get('[data-cy="carousel-info-btn"]').eq(1).click({force: true});
            cy.get('#tin-carousel-2-tooltip-0').should('exist');            
        });

        it('Mobile: Third label carousel works properly', () => {
            cy.get('[data-cy="carousel-btn-next"').eq(2).click({force: true});
            cy.get('[data-cy="tin-carousel-3-label-1"').should('be.visible');
            cy.get('[data-cy="carousel-info-btn"]').eq(2).click({force: true});
            cy.get('#tin-carousel-3-tooltip-1').should('be.visible');
            cy.get('[data-cy="carousel-btn-previous"').eq(2).click({force: true});
            cy.get('[data-cy="tin-carousel-3-label-0"').should('be.visible');
            cy.get('[data-cy="carousel-info-btn"]').eq(2).click({force: true});
            cy.get('#tin-carousel-3-tooltip-0').should('exist');            
        });
    });
});
