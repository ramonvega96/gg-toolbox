/// <reference types="cypress" />

describe('Reading Formula Labels', () => {
    context('Desktop', () => {
        beforeEach(() => {            
            cy.viewport('macbook-15');
            cy.visit('/digital-resources/choosing-baby-foods');
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

        it('Pouch labels carousel works properly', () => {
            cy.get('[data-cy="pouch-labels-carousel-label-0"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(0).trigger('mouseenter');
            cy.get('#pouch-labels-carousel-tooltip-0').should('exist');
            cy.get('[data-cy="carousel-btn-next"').eq(0).click();
            cy.get('[data-cy="pouch-labels-carousel-label-1"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(0).trigger('mouseenter');
            cy.get('#pouch-labels-carousel-tooltip-1').should('exist');
            cy.get('[data-cy="carousel-btn-previous"').eq(0).click();
            cy.get('[data-cy="pouch-labels-carousel-label-0"').should('exist');
            cy.get('[data-cy="carousel-info-btn"]').eq(0).trigger('mouseenter');
            cy.get('#pouch-labels-carousel-tooltip-0').should('exist');            
        });

        it('Pouch flavours carousel works properly', () => {   
            cy.get('[data-cy="interactive-img"]').then(($img) => {
                const initialImgSrc = $img.attr('src');
                cy.get('[data-tooltip-id="pouch-0-tooltip"').should('exist');
                cy.get('[data-tooltip-id="pouch-0-tooltip"]').trigger('mouseenter');
                cy.get('#pouch-0-tooltip').should('exist');
                cy.get('[data-cy="next-flavour-pouch"').click({force: true});
                cy.get('[data-cy="interactive-img"]').invoke('attr', 'src').then((newSrc) => {
                    expect(newSrc).not.to.equal(initialImgSrc);
                    cy.get('[data-tooltip-id="pouch-1-tooltip"').should('exist');
                    cy.get('[data-tooltip-id="pouch-1-tooltip"]').trigger('mouseenter');
                    cy.get('#pouch-1-tooltip').should('exist');
                });
            });            
            cy.get('[data-cy="interactive-img"]').then(($img) => {
                const initialImgSrc = $img.attr('src');
                cy.get('[data-tooltip-id="pouch-1-tooltip"').should('exist');
                cy.get('[data-tooltip-id="pouch-1-tooltip"]').trigger('mouseenter');
                cy.get('#pouch-1-tooltip').should('exist');
                cy.get('[data-cy="previous-flavour-pouch"').click({force: true});
                cy.get('[data-cy="interactive-img"]').invoke('attr', 'src').then((newSrc) => {
                    expect(newSrc).not.to.equal(initialImgSrc);
                    cy.get('[data-tooltip-id="pouch-0-tooltip"').should('exist');
                    cy.get('[data-tooltip-id="pouch-0-tooltip"]').trigger('mouseenter');
                    cy.get('#pouch-0-tooltip').should('exist');
                });
            });
        });

        it('Front info tooltips display properly', () => {
            const frontInfoTooltips = ["lid-tooltip", "things-to-consider-tooltip", "package-size-tooltip", "tag-price-tooltip", "age-texture-tooltip"];
            for (const tooltipDataId of frontInfoTooltips) {
                const selector = `[data-tooltip-id="${tooltipDataId}"]`;
                const tooltipId = `#${tooltipDataId}`;
                cy.get(selector).trigger('mouseenter');
                cy.get(tooltipId).should('exist');                
            }
        });

        it('Back info tooltips display properly', () => {
            cy.get('[data-cy="flip-img-btn"').click();
            const frontInfoTooltips = ["lid-tooltip", "things-to-consider-tooltip", "meat-content-tooltip", "vegetables-priority-tooltip", "salt-sugar-tooltip", "iron-rich-tooltip", "table-tooltip", "energy-tooltip", "protein-tooltip", "sugars-tooltip", "sodium-tooltip", "iron-tooltip"];
            for (const tooltipDataId of frontInfoTooltips) {
                const selector = `[data-tooltip-id="${tooltipDataId}"]`;
                const tooltipId = `#${tooltipDataId}`;
                cy.get(selector).trigger('mouseenter');
                cy.get(tooltipId).should('exist');                
            }
        });
    });

    context('Mobile View', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/digital-resources/choosing-baby-foods');
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

        it('Mobile: Pouch labels carousel works properly', () => {
            cy.get('[data-cy="pouch-labels-carousel-label-0"').should('be.visible');
            cy.get('[data-cy="carousel-info-btn"]').eq(0).click({force: true});
            cy.get('#pouch-labels-carousel-tooltip-0').should('be.visible');
            cy.get('[data-cy="carousel-btn-next"').eq(0).click({force: true});
            cy.get('[data-cy="pouch-labels-carousel-label-1"').should('be.visible');
            cy.get('[data-cy="carousel-info-btn"]').eq(0).click({force: true});
            cy.get('#pouch-labels-carousel-tooltip-1').should('be.visible');
            cy.get('[data-cy="carousel-btn-previous"').eq(0).click({force: true});
            cy.get('[data-cy="pouch-labels-carousel-label-0"').should('be.visible');
            cy.get('[data-cy="carousel-info-btn"]').eq(0).click({force: true});
            cy.get('#pouch-labels-carousel-tooltip-0').should('exist');            
        });

        it.skip('Mobile: Pouch flavours carousel works properly', () => {   
            cy.get('[data-cy="interactive-img"]').then(($img) => {
                const initialImgSrc = $img.attr('src');
                cy.get('[data-tooltip-id="pouch-0-tooltip"').should('exist');
                cy.get('[data-tooltip-id="pouch-0-tooltip"]').click({force: true});
                cy.get('#pouch-0-tooltip').should('exist');
                cy.get('[data-cy="next-flavour-pouch"').click({force: true});
                cy.get('[data-cy="interactive-img"]').invoke('attr', 'src').then((newSrc) => {
                    expect(newSrc).not.to.equal(initialImgSrc);
                    cy.get('[data-tooltip-id="pouch-1-tooltip"').should('exist');
                    cy.get('[data-tooltip-id="pouch-1-tooltip"]').click({force: true});
                    cy.get('#pouch-1-tooltip').should('exist');
                });
            });            
            cy.get('[data-cy="interactive-img"]').then(($img) => {
                const initialImgSrc = $img.attr('src');
                cy.get('[data-tooltip-id="pouch-1-tooltip"').should('exist');
                cy.get('[data-tooltip-id="pouch-1-tooltip"]').click({force: true});
                cy.get('#pouch-1-tooltip').should('exist');
                cy.get('[data-cy="previous-flavour-pouch"').click({force: true});
                cy.get('[data-cy="interactive-img"]').invoke('attr', 'src').then((newSrc) => {
                    expect(newSrc).not.to.equal(initialImgSrc);
                    cy.get('[data-tooltip-id="pouch-0-tooltip"').should('exist');
                    cy.get('[data-tooltip-id="pouch-0-tooltip"]').click({force: true});
                    cy.get('#pouch-0-tooltip').should('exist');
                });
            });
        });

        it.skip('Mobile: Front info tooltips display properly', () => {
            const frontInfoTooltips = ["lid-tooltip", "things-to-consider-tooltip", "package-size-tooltip", "tag-price-tooltip", "age-texture-tooltip"];
            for (const tooltipDataId of frontInfoTooltips) {
                const selector = `[data-tooltip-id="${tooltipDataId}"]`;
                const tooltipId = `#${tooltipDataId}`;
                cy.get(selector).click({force: true});
                cy.get(tooltipId).should('exist');                
            }
        });

        it('Mobile: Back info tooltips display properly', () => {
            cy.get('[data-cy="flip-img-btn"').click();
            const frontInfoTooltips = ["lid-tooltip", "things-to-consider-tooltip", "meat-content-tooltip", "vegetables-priority-tooltip", "salt-sugar-tooltip", "iron-rich-tooltip", "table-tooltip", "energy-tooltip", "protein-tooltip", "sugars-tooltip", "sodium-tooltip", "iron-tooltip"];
            for (const tooltipDataId of frontInfoTooltips) {
                const selector = `[data-tooltip-id="${tooltipDataId}"]`;
                const tooltipId = `#${tooltipDataId}`;
                cy.get(selector).click({force: true});
                cy.get(tooltipId).should('exist');                
            }
        });
    });
});
