/// <reference types="cypress" />

describe('Browse Categories pathway', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.viewport('macbook-15');
            cy.visit('/browse');
        });

        it('All accordions for categories exist', () => {
            cy.get('[id^="category-accordion-"]').should('have.length', 7);            
        });

        it('All terms in accordions redirect properly', () => {
            const termsMatrix = [
                [
                  'Breastfeeding',
                  'Formula%20Feeding',
                  'Expressing',
                  'Troubleshooting',
                  'Safety'
                ],
                [
                  'First%20Foods',
                  'Finger%20Foods',
                  'Food%20Safety',
                  'Good%20Habits'
                ],
                [
                  'Fussy%20Eating',
                  'Mealtime%20Environment',
                  'Eating%20On%20A%20Budget',
                  'Recipes%20And%20Meal%20Planning',
                  'Lunchboxes'
                ],
                [
                  'Healthy%20Habits%20And%20Healthy%20Growth',
                  'Healthy%20Eating',
                  'Healthy%20Drinks',
                  'Portion%20Sizes',
                  'Plant%20Based%20Eating',
                  'Physical%20Activity',
                  'Sleep',
                  'Dental%20Health'
                ],
                [
                  'Developmental%20Milestones',
                  'Growth%20Charts'
                ],
                [
                  'Allergies%20And%20Intolerances',
                  'Tummy%2C%20Gut%20And%20Mouth%20Problems',
                  'Neurodevelopmental',
                  'Growth%20Concerns',
                  'Nutrients'
                ],
                [
                  'Menu%20Planning',
                  'Guidelines%20And%20Policies',
                  'Professional%20Development%20And%20Training'
                ]
            ];
              
            termsMatrix.forEach((termsArr, arrIndex) => {
                termsArr.forEach((term, index) => {
                    cy.get('[id^="category-accordion-"]').eq(arrIndex).click();
                    cy.get('[id^="topic-card"]:visible')
                        .should('have.length', termsArr.length)
                        .eq(index)
                        .click();
                    cy.url().should('include', `subcategories=${term}`);
                    cy.visit('/browse');
                });
            });              
        });        
    });

    context('Mobile', () => {
        beforeEach(() => {
            cy.visit('/browse');
            cy.viewport('iphone-6');
        });

        it('All accordions for categories exist exists', () => {
            cy.get('[id^="category-accordion-"]').should('have.length', 7);            
        });

        it('All terms in accordions redirect properly', () => {
          const termsMatrix = [
              [
                'Breastfeeding',
                'Formula%20Feeding',
                'Expressing',
                'Troubleshooting',
                'Safety'
              ],
              [
                'First%20Foods',
                'Finger%20Foods',
                'Food%20Safety',
                'Good%20Habits'
              ],
              [
                'Fussy%20Eating',
                'Mealtime%20Environment',
                'Eating%20On%20A%20Budget',
                'Recipes%20And%20Meal%20Planning',
                'Lunchboxes'
              ],
              [
                'Healthy%20Habits%20And%20Healthy%20Growth',
                'Healthy%20Eating',
                'Healthy%20Drinks',
                'Portion%20Sizes',
                'Plant%20Based%20Eating',
                'Physical%20Activity',
                'Sleep',
                'Dental%20Health'
              ],
              [
                'Developmental%20Milestones',
                'Growth%20Charts'
              ],
              [
                'Allergies%20And%20Intolerances',
                'Tummy%2C%20Gut%20And%20Mouth%20Problems',
                'Neurodevelopmental',
                'Growth%20Concerns',
                'Nutrients'
              ],
              [
                'Menu%20Planning',
                'Guidelines%20And%20Policies',
                'Professional%20Development%20And%20Training'
              ]
          ];
              
            termsMatrix.forEach((termsArr, arrIndex) => {
                termsArr.forEach((term, index) => {
                    cy.get('[id^="category-accordion-"]').eq(arrIndex).click({force: true});
                    cy.get('[id^="topic-card"]:visible')
                        .should('have.length', termsArr.length)
                        .eq(index)
                        .click({force: true});
                    cy.url().should('include', `subcategories=${term}`);
                    cy.visit('/browse');
                });
            });           
        });           
    });
});
