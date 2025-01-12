/// <reference types="cypress" />

describe('Lumpy Road To Solids', () => {
    context('Desktop', () => {
        beforeEach(() => {            
            cy.viewport('macbook-15');
            cy.visit('/digital-resources/lumpy-road-to-solids');
        });

        it('Digital resource container should be displayed', () => {
            cy.get('.bg-road').should('exist');
        });

        it('Should display all developmental stages', () => {
            cy.get('[data-cy="road-stage"]').its('length').should('eq', 8);
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

        it('Should display first developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(0).click();
            cy.get('[data-cy="modal-stg0"]').find('[data-cy="modal-text"]').should('exist');
            cy.get('[data-cy="modal-stg0"]').get('[data-cy="modal-btn"]').its('length').should('eq', 3);
        });

        it('Should display second developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(1).click();
            cy.get('[data-cy="modal-stg1"]').find('[data-cy="modal-text"]').should('exist');
            cy.get('[data-cy="modal-stg1"]').get('[data-cy="modal-btn"]').its('length').should('eq', 3);
        });

        it('Should display third developmental stage modal content 0 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(2).click();
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="modal-tab"]').its('length').should('eq', 5);
            cy.get('[data-cy="modal-stg2"]').find('[data-cy="section0-content"]').should('be.visible');
            cy.get('[data-cy="section0-content"]').find('[data-cy="section0-text"]').should('be.visible');
            cy.get('[data-cy="section0-content"]').find('[data-cy="section0-further-info"]').should('be.visible');
            cy.get('[data-cy="section0-content"]').find('[data-cy="section0-btns"]').should('be.visible');
            cy.get('[data-cy="section0-content"]').find('[data-cy="modal-btn"]').should('have.length', 2);
        });

        it('Should display third developmental stage modal content 1 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(2).click();
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="modal-tab"]').eq(1).click();
            cy.get('[data-cy="modal-stg2"]').find('[data-cy="section1-content"]').should('be.visible');
            cy.get('[data-cy="section1-content"]').find('[data-cy="section1-text"]').should('be.visible');
            cy.get('[data-cy="section1-content"]').find('[data-cy="section1-further-info"]').should('be.visible');
            cy.get('[data-cy="section1-content"]').find('[data-cy="modal-btn"]').should('have.length', 1);
        });

        it('Should display third developmental stage modal content 2 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(2).click();
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="modal-tab"]').eq(2).click();
            cy.get('[data-cy="modal-stg2"]').find('[data-cy="section2-content"]').should('be.visible');
            cy.get('[data-cy="section2-content"]').find('[data-cy="section2-text"]').should('be.visible');
            cy.get('[data-cy="section2-content"]').find('[data-cy="section2-further-info"]').should('be.visible');
            cy.get('[data-cy="section2-content"]').find('[data-cy="modal-btn"]').should('have.length', 1);
            cy.get('[data-cy="section2-content"]').find('[data-cy="section2-foods-display"]').should('be.visible');
            cy.get('[data-cy="section2-foods-display"]').find('[data-cy="section2-foods-group0"]').should('be.visible');
            cy.get('[data-cy="section2-foods-display"]').find('[data-cy="section2-foods-group1"]').should('be.visible');
            cy.get('[data-cy="section2-foods-display"]').find('[data-cy="section2-foods-group2"]').should('be.visible');
            cy.get('[data-cy="section2-foods-display"]').find('[data-cy="section2-foods-group3"]').should('be.visible');
        });

        it('Should display third developmental stage modal content 3 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(2).click();
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="modal-tab"]').eq(3).click();
            cy.get('[data-cy="modal-stg2"]').find('[data-cy="section3-content"]').should('be.visible');
            cy.get('[data-cy="section3-content"]').find('[data-cy="section3-text"]').should('be.visible');
            cy.get('[data-cy="section3-content"]').find('[data-cy="section3-baby"]').should('be.visible');
        });

        it('Should display third developmental stage modal content 4 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(2).click();
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="modal-tab"]').eq(4).click();
            cy.get('[data-cy="modal-stg2"]').find('[data-cy="section4-content"]').should('be.visible');
            cy.get('[data-cy="section4-content"]').find('[data-cy="section4-text"]').should('be.visible');
            cy.get('[data-cy="section4-content"]').find('[data-cy="section4-babies"]').should('be.visible');
            cy.get('[data-cy="section4-babies"]').find('[data-cy="section4-baby1"]').should('be.visible');
            cy.get('[data-cy="section4-babies"]').find('[data-cy="section4-baby2"]').should('be.visible');
            cy.get('[data-cy="section4-content"]').find('[data-cy="section4-further-info"]').should('be.visible');
            cy.get('[data-cy="section4-content"]').find('[data-cy="modal-btn"]').should('have.length', 1);
        });

        it('Should display fourth developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(3).click();
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-text1"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-text2"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-text3"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-baby1"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-baby2"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-baby3"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').get('[data-cy="modal-tab"]').its('length').should('eq', 2);            
        });

        it('Should display fourth developmental stage modal content 0 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(3).click();
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-foods-ul"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food0-img"]').should('be.visible');            
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food1-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food2-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food3-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food3-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food4-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food4-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food5-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food5-img"]').should('be.visible');
        });

        it('Should display fourth developmental stage modal content 1 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(3).click();
            cy.get('[data-cy="modal-stg3"]').get('[data-cy="modal-tab"]').eq(1).click();
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-foods-ul"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food0-img"]').should('be.visible');            
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food1-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food2-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food3-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food3-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food4-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food4-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food5-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food5-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food6-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food6-img"]').should('be.visible');
        });

        it('Should display fifth developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(4).click();
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="modal-text1"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="modal-text2"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food-ideas-ul"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="modal-text3"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="modal-btn"]').should('have.length', 1);
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food0-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food1-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food2-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food3-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food3-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="modal-baby-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="iron-rich-foods"]').should('be.visible');               
        });

        it('Should display sixth developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(5).click();
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="modal-text1"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food-ideas-ul"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="modal-btn"]').should('have.length', 1);
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food0-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food1-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food2-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food3-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food3-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="modal-baby-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="iron-rich-foods"]').should('be.visible');               
        });

        it('Should display seventh developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(6).click();
            cy.get('[data-cy="modal-stg6"]').find('[data-cy="modal-text1"]').should('be.visible');
            cy.get('[data-cy="modal-stg6"]').find('[data-cy="modal-text2"]').should('be.visible');
            cy.get('[data-cy="modal-stg6"]').find('[data-cy="modal-baby1-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg6"]').find('[data-cy="modal-baby2-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg6"]').find('[data-cy="modal-baby3-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg6"]').find('[data-cy="modal-baby4-img"]').should('be.visible');           
        });

        it('Should display eighth developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(7).click();
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="modal-text1"]').should('be.visible');
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="modal-ul1"]').should('be.visible');
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="modal-ul2"]').should('be.visible');
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="further-info"]').should('be.visible');
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="modal-btn"]').should('have.length', 1);
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="modal-baby-img"]').should('be.visible');          
        });
    });

    context('Mobile View', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/digital-resources/lumpy-road-to-solids');
        });

        it('Digital resource container should be displayed', () => {
            cy.get('.bg-road-mobile').should('exist');
        });

        it('Should display all developmental stages', () => {
            cy.get('[data-cy="road-stage-mobile"]').its('length').should('eq', 8);
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

        it('Should display first developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(0).click({force: true});
            cy.get('[data-cy="modal-stg0"]').find('[data-cy="modal-text"]').should('exist');
            cy.get('[data-cy="modal-stg0"]').get('[data-cy="modal-btn"]').its('length').should('eq', 3);
        });

        it('Should display second developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(1).click({force: true});
            cy.get('[data-cy="modal-stg1"]').find('[data-cy="modal-text"]').should('exist');
            cy.get('[data-cy="modal-stg1"]').get('[data-cy="modal-btn"]').its('length').should('eq', 3);
        });

        it('Should display third developmental stage modal content 0 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(2).click({force: true});
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="accordion-btn"]').its('length').should('eq', 5);
            cy.get('[data-cy="modal-stg2"]').find('[data-cy="section0-content"]').should('be.visible');
            cy.get('[data-cy="section0-content"]').find('[data-cy="section0-text"]').should('be.visible');
            cy.get('[data-cy="section0-content"]').find('[data-cy="section0-further-info"]').should('be.visible');
            cy.get('[data-cy="section0-content"]').find('[data-cy="section0-btns"]').should('be.visible');
            cy.get('[data-cy="section0-content"]').find('[data-cy="modal-btn"]').should('have.length', 2);
        });

        it('Should display third developmental stage modal content 1 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(2).click({force: true});
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="accordion-btn"]').eq(1).click({force: true});
            cy.get('[data-cy="modal-stg2"]').find('[data-cy="section1-content"]').should('be.visible');
            cy.get('[data-cy="section1-content"]').find('[data-cy="section1-text"]').should('be.visible');
            cy.get('[data-cy="section1-content"]').find('[data-cy="section1-further-info"]').should('be.visible');
            cy.get('[data-cy="section1-content"]').find('[data-cy="modal-btn"]').should('have.length', 1);
        });

        it('Should display third developmental stage modal content 2 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(2).click({force: true});
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="accordion-btn"]').eq(2).click({force: true});
            cy.get('[data-cy="modal-stg2"]').find('[data-cy="section2-content"]').should('be.visible');
            cy.get('[data-cy="section2-content"]').find('[data-cy="section2-text"]').should('be.visible');
            cy.get('[data-cy="section2-content"]').find('[data-cy="section2-further-info"]').should('be.visible');
            cy.get('[data-cy="section2-content"]').find('[data-cy="modal-btn"]').should('have.length', 1);
            cy.get('[data-cy="section2-content"]').find('[data-cy="section2-foods-display"]').should('be.visible');
            cy.get('[data-cy="section2-foods-display"]').find('[data-cy="section2-foods-group0"]').should('be.visible');
            cy.get('#carousel-spin-right').click({force: true});
            cy.get('[data-cy="section2-foods-display"]').find('[data-cy="section2-foods-group1"]').should('be.visible');
            cy.get('#carousel-spin-right').click({force: true});
            cy.get('[data-cy="section2-foods-display"]').find('[data-cy="section2-foods-group2"]').should('be.visible');
            cy.get('#carousel-spin-right').click({force: true});
            cy.get('[data-cy="section2-foods-display"]').find('[data-cy="section2-foods-group3"]').should('be.visible');
            cy.get('#carousel-spin-left').click({force: true});
            cy.get('[data-cy="section2-foods-display"]').find('[data-cy="section2-foods-group2"]').should('be.visible');
            cy.get('#carousel-spin-left').click({force: true});
            cy.get('[data-cy="section2-foods-display"]').find('[data-cy="section2-foods-group1"]').should('be.visible');
            cy.get('#carousel-spin-left').click({force: true});
            cy.get('[data-cy="section2-foods-display"]').find('[data-cy="section2-foods-group0"]').should('be.visible');
        });

        it('Should display third developmental stage modal content 3 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(2).click({force: true});
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="accordion-btn"]').eq(3).click({force: true});
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="accordion-btn"]').eq(3).scrollIntoView({force: true});
            cy.get('[data-cy="modal-stg2"]').find('[data-cy="section3-content"]').should('be.visible');
            cy.get('[data-cy="section3-content"]').find('[data-cy="section3-text"]').should('be.visible');
            cy.get('[data-cy="section3-content"]').find('[data-cy="section3-baby"]').should('be.visible');
        });

        it('Should display third developmental stage modal content 4 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(2).click({force: true});
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="accordion-btn"]').eq(4).click({force: true});
            cy.get('[data-cy="modal-stg2"]').get('[data-cy="accordion-btn"]').eq(4).scrollIntoView({force: true});
            cy.get('[data-cy="modal-stg2"]').find('[data-cy="section4-content"]').should('be.visible');
            cy.get('[data-cy="section4-content"]').find('[data-cy="section4-text"]').should('be.visible');
            cy.get('[data-cy="section4-content"]').find('[data-cy="section4-babies"]').should('be.visible');
            cy.get('[data-cy="section4-babies"]').find('[data-cy="section4-baby1"]').should('be.visible');
            cy.get('[data-cy="section4-babies"]').find('[data-cy="section4-baby2"]').should('be.visible');
            cy.get('[data-cy="section4-content"]').find('[data-cy="section4-further-info"]').should('be.visible');
            cy.get('[data-cy="section4-content"]').find('[data-cy="modal-btn"]').should('have.length', 1);
        });

        it('Should display fourth developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(3).click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-text1"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-text2"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-text3"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').get('[data-cy="modal-text3"]').scrollIntoView({force: true});           
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-baby1"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-baby2"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="modal-baby3"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').get('[data-cy="accordion-btn"]').its('length').should('eq', 2);            
        });

        it('Should display fourth developmental stage modal content 0 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(3).click({force: true});            
            cy.get('[data-cy="modal-stg3"]').get('[data-cy="accordion-btn"]').eq(0).scrollIntoView({force: true});            
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-foods-ul"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food-carousel"]').should('exist');
            cy.get('[data-cy="modal-stg3"]').get('[data-cy="section0-food-carousel"]').scrollIntoView({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food0-img"]').should('be.visible');
            cy.get('#section0-carousel-spin-right').click({force: true});            
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food1-img"]').should('be.visible');
            cy.get('#section0-carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food2-img"]').should('be.visible');
            cy.get('#section0-carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food3-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food3-img"]').should('be.visible');
            cy.get('#section0-carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food4-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food4-img"]').should('be.visible');
            cy.get('#section0-carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food5-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food5-img"]').should('be.visible');
            cy.get('#section0-carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food4-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food4-img"]').should('be.visible');
            cy.get('#section0-carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food3-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food3-img"]').should('be.visible');
            cy.get('#section0-carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food2-img"]').should('be.visible');
            cy.get('#section0-carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food1-img"]').should('be.visible');
            cy.get('#section0-carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section0-food0-img"]').should('be.visible');
        });

        it('Should display fourth developmental stage modal content 1 properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(3).click({force: true});
            cy.get('[data-cy="modal-stg3"]').get('[data-cy="accordion-btn"]').eq(1).scrollIntoView({force: true}); 
            cy.get('[data-cy="modal-stg3"]').get('[data-cy="accordion-btn"]').eq(1).click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-foods-ul"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food-carousel"]').should('exist');
            cy.get('[data-cy="modal-stg3"]').get('[data-cy="section1-food-carousel"]').scrollIntoView({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food0-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food1-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food2-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food3-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food3-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food4-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food4-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food5-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food5-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food6-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food6-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food5-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food5-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food4-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food4-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food3-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food3-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food2-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food1-img"]').should('be.visible');
            cy.get('#section1-carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg3"]').find('[data-cy="section1-food0-img"]').should('be.visible');
        });

        it('Should display fifth developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(4).click({force: true});
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="modal-text1"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="modal-text2"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food-ideas-ul"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').get('[data-cy="food-carousel"]').scrollIntoView({force: true}); 
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="modal-text3"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="modal-btn"]').should('have.length', 1);
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food0-img"]').should('be.visible');
            cy.get('#carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food1-img"]').should('be.visible');
            cy.get('#carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food2-img"]').should('be.visible');
            cy.get('#carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food3-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food3-img"]').should('be.visible');
            cy.get('#carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food2-img"]').should('be.visible');
            cy.get('#carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food1-img"]').should('be.visible');
            cy.get('#carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="food0-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').get('[data-cy="modal-btn"]').scrollIntoView({force: true});
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="modal-baby-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg4"]').find('[data-cy="iron-rich-foods"]').should('be.visible');               
        });

        it('Should display sixth developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(5).click({force: true});
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="modal-text1"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food-ideas-ul"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').get('[data-cy="food-carousel"]').scrollIntoView({force: true}); 
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="modal-btn"]').should('have.length', 1);
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food0-img"]').should('be.visible');
            cy.get('#carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food1-img"]').should('be.visible');
            cy.get('#carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food2-img"]').should('be.visible');
            cy.get('#carousel-spin-right').click({force: true});
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food3-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food3-img"]').should('be.visible');
            cy.get('#carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food2-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food2-img"]').should('be.visible');
            cy.get('#carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food1-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food1-img"]').should('be.visible');
            cy.get('#carousel-spin-left').click({force: true});
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food0-label"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="food0-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').get('[data-cy="modal-btn"]').scrollIntoView({force: true});
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="modal-baby-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg5"]').find('[data-cy="iron-rich-foods"]').should('be.visible');               
        });

        it('Should display seventh developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(6).click({force: true});
            cy.get('[data-cy="modal-stg6"]').find('[data-cy="modal-text1"]').should('be.visible');
            cy.get('[data-cy="modal-stg6"]').find('[data-cy="modal-text2"]').should('be.visible');
            cy.get('[data-cy="modal-stg6"]').get('[data-cy="modal-baby1-img"]').scrollIntoView({force: true});
            cy.get('[data-cy="modal-stg6"]').find('[data-cy="modal-baby1-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg6"]').find('[data-cy="modal-baby2-img"]').should('be.visible');
            cy.get('[data-cy="modal-stg6"]').find('[data-cy="modal-baby3-img"]').should('be.visible');           
        });

        it('Should display eighth developmental stage modal properly', () => {
            cy.get('[data-cy="stage-fom-btn"]').eq(7).click({force: true});
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="modal-text1"]').should('be.visible');
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="modal-ul1"]').should('be.visible');
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="modal-ul2"]').should('be.visible');
            cy.get('[data-cy="modal-stg7"]').get('[data-cy="further-info"]').scrollIntoView({force: true});
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="further-info"]').should('be.visible');
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="modal-btn"]').should('have.length', 1);
            cy.get('[data-cy="modal-stg7"]').find('[data-cy="modal-baby-img"]').should('be.visible');          
        });
    });
});
