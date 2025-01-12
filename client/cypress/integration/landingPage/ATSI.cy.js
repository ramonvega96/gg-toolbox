/// <reference types="cypress" />

describe('Aboriginal & Torres Strait Islander Peoples Page', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.viewport('macbook-15');
            cy.get('#desktop-aboriginalAndTorresStraitIslander').trigger('click');
            cy.url().should('include', 'pathway=aboriginal-and-torres-strait');
        });      

        it('Searchbar component routes properly on search button click', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('#search-icon-button').click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.go('back');
            cy.url().should('not.include', 'search');
        });

        it('Searchbar component routes properly on enter hit', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('#search-bar-input').trigger('keydown', { keyCode: 13 });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('[id^="filter-tag-remove-"]:visible:first').click();
            cy.get('#search-icon-button').click();
            cy.url().should('not.include', '&audiences=Health+Professionals');
        });

        it('Searchbar component routes properly on dropdown option click', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('[id^="searchbar-dropdown-suggestion-"]:first').click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
        });
        
        it('All topic buttons must be rendered correctly', () => {
            cy.get('[id^="topic-button-"]').should('have.length', 11);
        });

        it('Parents and families topic buttons route properly', () => {
            cy.get('[id^="topic-button-"]').eq(0).click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'categories=antenatal+diet+and+lifestyle');            
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(1).click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'subcategories=breastfeeding');            
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(2).click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'subcategories=formula+feeding');;
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(3).click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'subcategories=nutrients')
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(4).click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'categories=introducing+solids');            
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(5).click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'subcategories=healthy+eating');            
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(6).click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'subcategories=healthy+drinks');
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(7).click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'subcategories=healthy+habits+and+healthy+growth');
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();
        });

        it('Health professionals topic buttons route properly', () => {
            cy.get('[id^="topic-button-"]').eq(8).contains('IAHA Workforce support').should('be.visible');
            cy.get('[id^="topic-button-"]').eq(9).contains('NACCHO - Find an Aboriginal Community Controlled Health Organisation').should('be.visible');
            cy.get('[id^="topic-button-"]').eq(10).contains('HealthInfoNet').should('be.visible');
        });

        it('All states in HomeMapComponent display a modal with adequate buttons', () => {
            cy.get('#QLD').scrollIntoView();
            cy.get('#QLD').click();
            cy.url().should('include', 'state=qld&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();            
            cy.get('#NT').scrollIntoView();
            cy.get('#NT').click();
            cy.url().should('include', 'state=nt&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();            
            cy.get('#WA').scrollIntoView();
            cy.get('#WA').click();
            cy.url().should('include', 'state=wa&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();            
            cy.get('#SA').scrollIntoView();
            cy.get('#SA').click();
            cy.url().should('include', 'state=sa&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();            
            cy.get('#NSW').scrollIntoView();
            cy.get('#NSW').click();
            cy.url().should('include', 'state=nsw&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();            
            cy.get('#ACT').scrollIntoView();
            cy.get('#ACT').click();
            cy.url().should('include', 'state=act&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();            
            cy.get('#VIC').scrollIntoView();
            cy.get('#VIC').click();
            cy.url().should('include', 'state=vic&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#desktop-aboriginalAndTorresStraitIslander').click();            
            cy.get('#TAS').scrollIntoView();
            cy.get('#TAS').click();
            cy.url().should('include', 'state=tas&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
        });

        it('Artwork story modal displays and route properly', () => {
            cy.get('#modal-btn').click();
            cy.get('#go-to-artist').click();
            cy.url().should('include', 'about-us?scrollTo=artist');
            cy.get('#go-to-artwork').click();
            cy.url().should('include', 'pathway=aboriginal-and-torres-strait&modalDisplay=open');
            cy.get('#go-to-artist').scrollIntoView();
            cy.get('#go-to-artist').should('be.visible');
        });

        it('Personalise-a-resource routes properly', () => {
            cy.get('[id="fc-btn-text"]').eq(0).click();
            cy.url().should('include', `/personalise-a-resource`);            
        });

        it('Contact us routes properly', () => {
            cy.get('[id="sc-btn-text"]').eq(0).click();
            cy.url().should('include', `/contact-us`);   
        });

        it('Font size in welcome component header should match font size in topics grid component header', () => {
            cy.get('#section-title').invoke('css', 'font-size').then((fontSize1) => {
                cy.get('[data-cy=topics-header]').each((element) => {
                    cy.wrap(element).invoke('css', 'font-size').then((fontSize2) => {
                        expect(fontSize1).to.equal(fontSize2);
                    });
                });
            });
        });

        it('Font size in welcome component body text should match font size in topics grid component body text', () => {
            cy.get('#section-description').invoke('css', 'font-size').then((fontSize1) => {
                cy.get('[data-cy=topics-description]').each((element) => {
                    cy.wrap(element).invoke('css', 'font-size').then((fontSize2) => {
                        expect(fontSize1).to.equal(fontSize2);
                    });
                });
            });
        });
    });

    context('Mobile', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.viewport('iphone-6');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();
            cy.url().should('include', 'pathway=aboriginal-and-torres-strait');
        });      

        it('Mobile: Searchbar component routes properly on search button click', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true });
            cy.get('#search-icon-button').click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.go('back');
            cy.url().should('not.include', 'search');
        });

        it('Mobile: Searchbar component routes properly on enter hit', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-tag-remove-"]:first').click({ force: true });
            cy.get('#search-icon-button').click({ force: true });
            cy.url().should('not.include', '&audiences=Health+Professionals');
        });

        it('Mobile: Searchbar component routes properly on dropdown option click', () => {
            cy.get('#search-bar-input').type('breastfeeding', { force: true });
            cy.get('[id^="searchbar-dropdown-suggestion-"]:first').click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
        });
        
        it('Mobile: All topic buttons must be rendered correctly', () => {
            cy.get('[id^="topic-button-"]').should('have.length', 11);
        });

        it('Mobile: Parents and families topic buttons route properly', () => {
            cy.get('[id^="topic-button-"]').eq(0).click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'categories=antenatal+diet+and+lifestyle');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(1).click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'subcategories=breastfeeding');   
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(2).click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'subcategories=formula+feeding');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(3).click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'subcategories=nutrients');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(4).click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'categories=introducing+solids');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(5).click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');            
            cy.url().should('include', 'subcategories=healthy+eating');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();

            cy.get('[id^="topic-button-"]').eq(6).click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'subcategories=healthy+drinks');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click({ force: true });

            cy.get('[id^="topic-button-"]').eq(7).click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'subcategories=healthy+habits+and+healthy+growth');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();
        });

        it('Mobile: Health professionals topic buttons route properly', () => {
            cy.get('[id^="topic-button-"]').eq(8).contains('IAHA Workforce support').should('be.visible');
            cy.get('[id^="topic-button-"]').eq(9).contains('NACCHO - Find an Aboriginal Community Controlled Health Organisation').should('be.visible');
            cy.get('[id^="topic-button-"]').eq(10).contains('HealthInfoNet').should('be.visible');            
        });

        it.only('Mobile: All states in HomeMapComponent display a modal with adequate buttons', () => {
            cy.get('#QLD').scrollIntoView();
            cy.get('#QLD').click();
            cy.url().should('include', 'state=qld&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();            
            cy.get('#NT').scrollIntoView();
            cy.get('#NT').click();
            cy.url().should('include', 'state=nt&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();            
            cy.get('#WA').scrollIntoView();
            cy.get('#WA').click();
            cy.url().should('include', 'state=wa&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();            
            cy.get('#SA').scrollIntoView();
            cy.get('#SA').click();
            cy.url().should('include', 'state=sa&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();            
            cy.get('#NSW').scrollIntoView();
            cy.get('#NSW').click();
            cy.url().should('include', 'state=nsw&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();            
            cy.get('#ACT').scrollIntoView();
            cy.get('#ACT').click();
            cy.url().should('include', 'state=act&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();            
            cy.get('#VIC').scrollIntoView();
            cy.get('#VIC').click();
            cy.url().should('include', 'state=vic&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#hamburger-button').click();
            cy.get('#mobile-aboriginalAndTorresStraitIslander').click();            
            cy.get('#TAS').scrollIntoView();
            cy.get('#TAS').click();
            cy.url().should('include', 'state=tas&cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');            
        });

        it('Mobile: Personalise-a-resource routes properly', () => {
            cy.get('[id="fc-btn-text"]').eq(0).click({ force: true });
            cy.url().should('include', `/personalise-a-resource`);            
        });

        it('Mobile: Contact us routes properly', () => {
            cy.get('[id="sc-btn-text"]').eq(0).click({ force: true });
            cy.url().should('include', `/contact-us`);   
        });

        it('Mobile: Artwork story modal displays and route properly', () => {
            cy.get('#modal-btn-mobile').click({ force: true });
            cy.get('#go-to-artist-mobile').click({ force: true });
            cy.url().should('include', 'about-us?scrollTo=artist');
            cy.get('#go-to-artwork').click({ force: true });
            cy.url().should('include', 'pathway=aboriginal-and-torres-strait&modalDisplay=open');
            cy.get('#go-to-artist-mobile').click({ force: true });
            cy.url().should('include', 'about-us?scrollTo=artist');         
        });

        it('Mobile: Font size in welcome component header should match font size in topics grid component header', () => {
            cy.get('#section-title').invoke('css', 'font-size').then((fontSize1) => {
                cy.get('[data-cy=topics-header]').each((element) => {
                    cy.wrap(element).invoke('css', 'font-size').then((fontSize2) => {
                        expect(fontSize1).to.equal(fontSize2);
                    });
                });
            });
        });

        it('Mobile: Font size in welcome component body text should match font size in topics grid component body text', () => {
            cy.get('#section-description').invoke('css', 'font-size').then((fontSize1) => {
                cy.get('[data-cy=topics-description]').each((element) => {
                    cy.wrap(element).invoke('css', 'font-size').then((fontSize2) => {
                        expect(fontSize1).to.equal(fontSize2);
                    });
                });
            });
        });
    });
});
