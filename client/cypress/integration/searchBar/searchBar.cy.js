/// <reference types="cypress" />

describe('Search Bar', () => {
    context('Desktop', () => {
        beforeEach(() => {
            cy.visit('/search');
            cy.viewport('macbook-15');
        });

        it('Search Bar exists', () => {
            cy.get('#search-bar').should('exist');
        });

        it('Search bar should be empty on load', () => {
            cy.get('#search-bar-input').should('have.value', '');
        });

        it('Search bar should have a placeholder', () => {
            cy.get('#search-bar-input').should(
                'have.attr',
                'placeholder',
                'Start typing here...'
            );
        });

        it('Search bar cross button should clear search', () => {
            cy.get('#search-bar-input').type('test');
            cy.get('#search-bar-clear').click();
            cy.get('#search-bar-input').should('have.value', '');
        });

        it('Searchbar navigation works properly', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('#search-icon-button').click();
            cy.url().should('include', 'tagname=breastfeeding');
            cy.get('#search-bar-clear').click();
            cy.get('#search-bar-input').type('ramadan');
            cy.get('#search-icon-button').click();
            cy.url().should('include', 'tagname=ramadan');
            cy.go('back');
            cy.url().should('not.include', 'tagname=ramadan');
            cy.url().should('include', 'tagname=breastfeeding');
            cy.go('back');
            cy.url().should('not.include', 'tagname');
        });

        it('New search should not remove existing filters', () => {
            cy.visit('/search?cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('#search-icon-button').click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'tagname=breastfeeding');
            cy.get('#search-bar-clear').click();
            cy.get('#search-bar-input').type('ramadan');
            cy.get('#search-icon-button').click();
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'tagname=ramadan');
            cy.go('back');
            cy.url().should('not.include', 'tagname=ramadan');
            cy.url().should('include', 'tagname=breastfeeding');
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.go('back');
            cy.url().should('not.include', 'tagname');
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
        });

        it('Language dropdown in resource card should update link and description', () => {
            cy.get('#search-bar-input').type('ramadan').trigger('keydown', { keyCode: 13 });
            cy.url().should('include', 'tagname=ramadan');
            cy.get('[id^="resource-card-container-"]').should('exist');
            cy.get('[id^="resource-title-"]:first').invoke('attr', 'href').as('resourceLink');
            cy.get('[id^="resource-description-"]:first').invoke('text').as('resourceDescription');

            let resourceLinkInitialValue;
            let resourceDescriptionInitialValue;

            cy.get('@resourceLink').then((value) => {
                resourceLinkInitialValue = value;
            }).then(() => {
                cy.get('@resourceDescription').then((value) => {
                    resourceDescriptionInitialValue = value;
                }).then(() => {
                    cy.get('[id^="resource-translated-versions-"]:first').click();
                    cy.get('[id^="resource-language-option-"]').filter(':visible').eq(1).click();
                    cy.get('[id^="resource-languages-dropdown-"]:first').should('have.class', 'hidden');
                    cy.get('@resourceLink').should('not.eq', resourceLinkInitialValue);
                    cy.get('@resourceDescription').should('not.eq', resourceDescriptionInitialValue);
                });
            });
        });

        it('Searchbar component routes properly on search button click', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('#search-icon-button').click();
            cy.url().should('include', 'tagname=breastfeeding');
            cy.get('[id^="resource-card-container-"]').should('exist');
        });

        it('Searchbar component routes properly on search, back and forward button click', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('#search-icon-button').click();
            cy.url().should('include', 'tagname=breastfeeding');
            cy.get('[id^="resource-card-container-"]').should('exist');
            cy.go("back");
            cy.url().should('not.include', 'tagname=breastfeeding');
            cy.go("forward");
            cy.url().should('include', 'tagname=breastfeeding');
        });

        it('Searchbar component routes properly on dropdown option click', () => {
            cy.get('#search-bar-input').type('breastfeeding');
            cy.get('[id^="searchbar-dropdown-suggestion-"]:first').click();
            cy.url().should('include', 'tagname=');
            cy.get('[id^="resource-card-container-"]').should('exist');
        });

        it('Unsuccesful search should result in no results found screen', () => {
            cy.get('#search-bar-input').type('asdfghjkl').trigger('keydown', { keyCode: 13 });
            cy.get('#no-results-found').should('exist');
        });

        it('Search works properly after unsuccesful search', () => {
            cy.get('#search-bar-input').type('asdfghjkl').trigger('keydown', { keyCode: 13 });
            cy.get('#no-results-found').should('exist');
            cy.get('#see-more-resources-button').click();
            cy.get('#see-more-resources-button').click();
            cy.get('#see-more-resources-button').click();
            cy.get('#search-bar-clear').click();
            cy.get('#search-bar-input').type('ramadan').trigger('keydown', { keyCode: 13 });
            cy.get('#no-results-found').should('not.exist');
        });

        it('Sort by newest/oldest feature properly sort resource cards', () => {
            cy.get('#search-bar-input').type('ramadan').trigger('keydown', { keyCode: 13 });
            cy.get('[id^="resource-title-"]:first').invoke('text').as('resourceTitle');
            cy.get('[id^="resource-publication-date-"]:first').invoke('text').as('resourceDate');

            let resourceTitleInitialValue;
            let resourceDateInitialValue;

            cy.get('@resourceTitle').then((value) => {
                resourceTitleInitialValue = value;
            }).then(() => {
                cy.get('@resourceDate').then((value) => {
                    resourceDateInitialValue = value;
                }).then(() => {
                    cy.get('#sorting-accordion').click();
                    cy.get('[id^="sorting-accordion-option-"]:nth-child(2)').click();
                    cy.get('@resourceTitle').should('not.eq', resourceTitleInitialValue);
                    cy.get('@resourceDate').should('not.eq', resourceDateInitialValue);
                });
            });
            cy.get('#sorting-accordion-options').should('not.be.visible');
            cy.get('@resourceTitle').then((value) => {
                resourceTitleInitialValue = value;
            }).then(() => {
                cy.get('@resourceDate').then((value) => {
                    resourceDateInitialValue = value;
                }).then(() => {
                    cy.get('#sorting-accordion').click();
                    cy.get('[id^="sorting-accordion-option-"]:nth-child(3)').click();
                    cy.get('@resourceTitle').should('not.eq', resourceTitleInitialValue);
                    cy.get('@resourceDate').should('not.eq', resourceDateInitialValue);
                });
            });
        });

        it('Sort by Z-A/A-Z feature properly sort resource cards', () => {
            cy.get('#search-bar-input').type('ramadan').trigger('keydown', { keyCode: 13 });
            cy.get('[id^="resource-title-"]:first').invoke('text').as('resourceTitle');
            cy.get('[id^="resource-publication-date-"]:first').invoke('text').as('resourceDate');

            let resourceTitleInitialValue;
            let resourceDateInitialValue;

            cy.get('@resourceTitle').then((value) => {
                resourceTitleInitialValue = value;
            }).then(() => {
                cy.get('@resourceDate').then((value) => {
                    resourceDateInitialValue = value;
                }).then(() => {
                    cy.get('#sorting-accordion').click();
                    cy.get('[id^="sorting-accordion-option-"]:nth-child(5)').click();
                    cy.get('@resourceTitle').should('not.eq', resourceTitleInitialValue);
                    cy.get('@resourceDate').should('not.eq', resourceDateInitialValue);
                });
            });
            cy.get('#sorting-accordion-options').should('not.be.visible');
            cy.get('@resourceTitle').then((value) => {
                resourceTitleInitialValue = value;
            }).then(() => {
                cy.get('@resourceDate').then((value) => {
                    resourceDateInitialValue = value;
                }).then(() => {
                    cy.get('#sorting-accordion').click();
                    cy.get('[id^="sorting-accordion-option-"]:nth-child(4)').click();
                    cy.get('@resourceTitle').should('not.eq', resourceTitleInitialValue);
                    cy.get('@resourceDate').should('not.eq', resourceDateInitialValue);
                });
            });
        });

        it('Iconkey container should display on hover and on click', () => {
            cy.get('#iconkey-container').should('not.be.visible');
            cy.get('#iconkey-icon').trigger('mouseover');
            cy.get('#iconkey-container').should('exist');
            cy.get('#iconkey-icon').click();
            cy.get('#iconkey-container').should('not.be.visible');
            cy.get('#iconkey-icon').click();
            cy.get('#iconkey-container').should('exist');
            cy.get('#iconkey-icon').click();
            cy.get('#iconkey-container').should('not.be.visible');
        });

        it('Apply filters feature works properly', () => {
            cy.intercept('POST', '/resource/searchbarQuery').as('searchbarQuery');
            cy.wait('@searchbarQuery');
            let filter;

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:first').click();
            cy.get('[id^="filter-categories"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-categories"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueCategories = [...new Set(response.map(item => item.category))];
                expect(uniqueCategories.length).to.equal(1);
                expect(uniqueCategories[0]).to.equal(filter);
            });
            cy.get('#web-clear-filters-button').click();
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:first').click();
            cy.get('[id^="filter-subcategories"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-subcategories"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueSubcategories = [...new Set(response.map(item => item.subcategory))];
                expect(uniqueSubcategories.length).to.equal(1);
                expect(uniqueSubcategories[0]).to.equal(filter);
            });
            cy.get('#web-clear-filters-button').click();
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:nth-child(2)').click();
            cy.get('[id^="filter-resourceTypes"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-resourceTypes"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueResourceTypes = [...new Set(response.map(item => item.resourceType))];
                expect(uniqueResourceTypes.length).to.equal(1);
                expect(uniqueResourceTypes[0]).to.equal(filter);
            });
            cy.get('#web-clear-filters-button').click();
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:nth-child(3)').click();
            cy.get('[id^="filter-ageGroups"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-ageGroups"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueAgeGroups = [...new Set(response.map(item => item.ageGroup))];
                expect(uniqueAgeGroups.length).to.equal(1);
                expect(uniqueAgeGroups[0]).to.equal(filter);
            });
            cy.get('#web-clear-filters-button').click();
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:nth-child(4)').click();
            cy.get('[id^="filter-audiences"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-audiences"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueAudiences = [...new Set(response.map(item => item.audience))];
                expect(uniqueAudiences.length).to.equal(1);
                expect(uniqueAudiences[0]).to.equal(filter);
            });
            cy.get('#web-clear-filters-button').click();
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:nth-child(5)').click();
            cy.get('[id^="filter-cultures"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-cultures"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueCultures = [...new Set(response.map(item => item.culture))];
                expect(uniqueCultures.length).to.equal(1);
                expect(uniqueCultures[0]).to.equal(filter);
            });
            cy.get('#web-clear-filters-button').click();
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:nth-child(6)').click();
            cy.get('[id^="filter-languages"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-languages"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueLanguages = [...new Set(response.map(item => item.language))];
                expect(uniqueLanguages.length).to.equal(1);
                expect(uniqueLanguages[0]).to.equal(filter);
            });
            cy.get('#web-clear-filters-button').click();
            cy.wait('@searchbarQuery');
        });

        it('Remove filters from tags feature works properly', () => {
            cy.intercept('POST', '/resource/searchbarQuery').as('searchbarQuery');
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:first').click();
            cy.get('[id^="filter-categories"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(1);
            });

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:first').click();
            cy.get('[id^="filter-subcategories"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(2);
            });

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:nth-child(2)').click();
            cy.get('[id^="filter-resourceTypes"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(3);
            });

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:nth-child(3)').click();
            cy.get('[id^="filter-ageGroups"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(4);
            });

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:nth-child(4)').click();
            cy.get('[id^="filter-audiences"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(5);
            });

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:nth-child(5)').click();
            cy.get('[id^="filter-cultures"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(6);
            });

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:nth-child(6)').click();
            cy.get('[id^="filter-languages"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(7);
            });

            cy.get('[id^="filter-tag-remove-"]:visible:first').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(6);
            });

            cy.get('[id^="filter-tag-remove-"]:visible:first').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(5);
            });

            cy.get('[id^="filter-tag-remove-"]:visible:first').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(4);
            });

            cy.get('[id^="filter-tag-remove-"]:visible:first').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(3);
            });

            cy.get('[id^="filter-tag-remove-"]:visible:first').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(2);
            });

            cy.get('[id^="filter-tag-remove-"]:visible:first').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(1);
            });

            cy.get('[id^="filter-tag-remove-"]:visible:first').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(0);
            });
        });

        it('Remove and add filters by going back and forward with browser works as expected', () => {
            cy.intercept('POST', '/resource/searchbarQuery').as('searchbarQuery');
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:first').click();
            cy.get('[id^="filter-categories"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(1);
            });

            cy.get('#filters-dropdown').click();
            cy.get('[id^="filter-accordion-"]:first').click();
            cy.get('[id^="filter-subcategories"]:first').click();
            cy.get('#apply-filters-button').click();
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(2);
            });

            cy.go('back');
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(1);
            });

            cy.go('back');
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(0);
            });

            cy.go('forward');
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(1);
            });

            cy.go('forward');
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(2);
            });
        });

        it('Paging component changes pages properly', () => {
            cy.intercept('POST', '/resource/searchbarQuery').as('searchbarQuery');
            cy.wait('@searchbarQuery');

            cy.get('#search-bar-input').type('breastfeeding').trigger('keydown', { keyCode: 13 });
            cy.wait('@searchbarQuery').then((interception) => {
                expect(interception.request.body.terms).to.equal('breastfeeding');
                expect(interception.request.body.page).to.equal(1);
                expect(interception.response.body.payload.first).to.equal(0);
            });

            cy.get('#page-marker-2').click();
            cy.wait('@searchbarQuery').then((interception) => {
                expect(interception.request.body.terms).to.equal('breastfeeding');
                expect(interception.request.body.page).to.equal(2);
                expect(interception.response.body.payload.first).to.equal(12);
            });

            cy.get('#paging-carousel-spin-left').click();
            cy.wait('@searchbarQuery').then((interception) => {
                expect(interception.request.body.terms).to.equal('breastfeeding');
                expect(interception.request.body.page).to.equal(1);
                expect(interception.response.body.payload.first).to.equal(0);
            });

            cy.get('#paging-carousel-spin-right').click();
            cy.wait('@searchbarQuery').then((interception) => {
                expect(interception.request.body.terms).to.equal('breastfeeding');
                expect(interception.request.body.page).to.equal(2);
                expect(interception.response.body.payload.first).to.equal(12);
            });
        });

        it('Resources per page works properly', () => {
            cy.intercept('POST', '/resource/searchbarQuery').as('searchbarQuery');
            cy.wait('@searchbarQuery');

            cy.get('#search-bar-input').type('breastfeeding').trigger('keydown', { keyCode: 13 });
            cy.wait('@searchbarQuery').then((interception) => {
                expect(interception.request.body.terms).to.equal('breastfeeding');
                expect(interception.response.body.payload.resources.length).to.equal(12);
            });

            const rppOptions = [9, 18, 36, 72];

            rppOptions.map(((rpp, index) => {
                cy.get('#rpp-dropdow').click({ force: true });
                cy.get(`#rpp-accordion-option-${index}`).click({ force: true });
                cy.wait('@searchbarQuery').then((interception) => {
                    expect(interception.request.body.terms).to.equal('breastfeeding');
                    expect(interception.response.body.payload.resources.length).to.equal(rpp);
                });
            }));
        });

        it('Resources like and dislike feature works properly', () => {
            cy.clearLocalStorage();
            cy.wait(5000);
            cy.intercept('POST', '/resource/userScore').as('userScoreSet');
            cy.get('[data-cy="feedback-resourceCard-like"]').eq(0).click();
            cy.wait('@userScoreSet').then((interception) => {
                expect(interception.request.body.caseNum).to.equal(0);
                expect(interception.response.body.success).to.equal(true);
            });
            cy.get('[data-cy="feedback-resourceCard-like"]').eq(0).click();
            cy.wait('@userScoreSet').then((interception) => {
                expect(interception.request.body.caseNum).to.equal(2);
                expect(interception.response.body.success).to.equal(true);
            });
            cy.get('[data-cy="feedback-resourceCard-dislike"]').eq(0).click();
            cy.wait('@userScoreSet').then((interception) => {
                expect(interception.request.body.caseNum).to.equal(1);
                expect(interception.response.body.success).to.equal(true);
            });
            cy.get('[data-cy="feedback-resourceCard-dislike"]').eq(0).click();
            cy.wait('@userScoreSet').then((interception) => {
                expect(interception.request.body.caseNum).to.equal(4);
                expect(interception.response.body.success).to.equal(true);
            });
            cy.get('[data-cy="feedback-resourceCard-like"]').eq(0).click();
            cy.wait('@userScoreSet').then(() => {
                cy.get('[data-cy="feedback-resourceCard-dislike"]').eq(0).click();
                cy.wait('@userScoreSet').then((interception) => {
                    expect(interception.request.body.caseNum).to.equal(3);
                    expect(interception.response.body.success).to.equal(true);
                });
            });
            cy.get('[data-cy="feedback-resourceCard-like"]').eq(0).click();
            cy.wait('@userScoreSet').then((interception) => {
                expect(interception.request.body.caseNum).to.equal(5);
                expect(interception.response.body.success).to.equal(true);
            });
        });
    });

    context('Mobile', () => {
        beforeEach(() => {
            cy.visit('/search');
            cy.viewport('iphone-6');
        });

        it('Mobile: Search Bar exists', () => {
            cy.get('#mobile-searchbar-component:visible').should('exist');
        });

        it('Mobile: Search bar should be empty on load', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').should('have.value', '');
        });

        it('Mobile: Search bar should have a placeholder', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').should(
                'have.attr',
                'placeholder',
                'Start typing here...'
            );
        });

        it('Mobile: Search bar cross button should clear search', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('test', { force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-clear:visible').click({ force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').should('have.value', '');
        });

        it('Mobile: Searchbar navigation works properly', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('breastfeeding', { force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-icon-button:visible').click({ force: true });
            cy.url().should('include', 'tagname=breastfeeding');
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-clear:visible').click({ force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('ramadan', { force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-icon-button:visible').click({ force: true });
            cy.url().should('include', 'tagname=ramadan');
            cy.go('back');
            cy.url().should('not.include', 'tagname=ramadan');
            cy.url().should('include', 'tagname=breastfeeding');
            cy.go('back');
            cy.url().should('not.include', 'tagname');
        });

        it('Mobile: New search should not remove existing filters', () => {
            cy.visit('/search?cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('breastfeeding', { force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-icon-button:visible').click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'tagname=breastfeeding');
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-clear:visible').click({ force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('ramadan', { force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-icon-button:visible').click({ force: true });
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.url().should('include', 'tagname=ramadan');
            cy.go('back');
            cy.url().should('not.include', 'tagname=ramadan');
            cy.url().should('include', 'tagname=breastfeeding');
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
            cy.go('back');
            cy.url().should('not.include', 'tagname');
            cy.url().should('include', 'cultures=Aboriginal+And+Torres+Strait+Islander+Peoples');
        });

        it('Mobile: Language dropdown in resource card should update link and description', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('ramadan', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.get('[id^="resource-card-container-"]').should('exist');
            cy.get('[id^="resource-title-"]:first').invoke('attr', 'href').as('resourceLink');
            cy.get('[id^="resource-description-"]:first').invoke('text').as('resourceDescription');

            let resourceLinkInitialValue;
            let resourceDescriptionInitialValue;

            cy.get('@resourceLink').then((value) => {
                resourceLinkInitialValue = value;
            }).then(() => {
                cy.get('@resourceDescription').then((value) => {
                    resourceDescriptionInitialValue = value;
                }).then(() => {
                    cy.get('[id^="resource-translated-versions-"]:first').click({ force: true });
                    cy.get('[id^="resource-language-option-"]:nth-child(2)').eq(0).click({ force: true });
                    cy.get('[id^="resource-languages-dropdown-"]:first').should('have.class', 'hidden');
                    cy.get('@resourceLink').should('not.eq', resourceLinkInitialValue);
                    cy.get('@resourceDescription').should('not.eq', resourceDescriptionInitialValue);
                });
            });
        });

        it('Mobile: Searchbar component routes properly on search button click', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('breastfeeding', { force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-icon-button:visible').click({ force: true });
            cy.url().should('include', 'tagname=breastfeeding');
            cy.get('[id^="resource-card-container-"]').should('exist');
        });

        it('Mobile: Searchbar component routes properly on search, back and forward button click', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('breastfeeding', { force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-icon-button:visible').click({ force: true });
            cy.url().should('include', 'tagname=breastfeeding');
            cy.get('[id^="resource-card-container-"]').should('exist');            
            cy.go("back");
            cy.url().should('not.include', 'tagname=breastfeeding');
            cy.go("forward");
            cy.url().should('include', 'tagname=breastfeeding');
        });

        it('Mobile: Searchbar component routes properly on dropdown option click', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('breastfeeding', { force: true });
            cy.get('[id^="searchbar-dropdown-suggestion-"]:first').click({ force: true });
            cy.url().should('include', 'tagname=');
            cy.get('[id^="resource-card-container-"]').should('exist');
        });

        it('Mobile: Unsuccesful search should result in no results found screen', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('asdfghjkl', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.get('#no-results-found').should('exist');
        });

        it('Mobile: Search works properly after unsuccesful search', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('asdfghjkl', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.get('#no-results-found').should('exist');
            cy.get('#see-more-resources-button').click({ force: true });
            cy.get('#see-more-resources-button').click({ force: true });
            cy.get('#see-more-resources-button').click({ force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-clear:visible').click({ force: true });
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('ramadan', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.get('#no-results-found').should('not.exist');
        });

        it('Mobile: Sort by newest/oldest feature properly sort resource cards', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('ramadan', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.get('[id^="resource-title-"]:first').invoke('text').as('resourceTitle');
            cy.get('[id^="resource-publication-date-"]:first').invoke('text').as('resourceDate');

            let resourceTitleInitialValue;
            let resourceDateInitialValue;

            cy.get('@resourceTitle').then((value) => {
                resourceTitleInitialValue = value;
            }).then(() => {
                cy.get('@resourceDate').then((value) => {
                    resourceDateInitialValue = value;
                }).then(() => {
                    cy.get('#sorting-accordion').click({ force: true });
                    cy.get('[id^="sorting-accordion-option-"]:nth-child(2)').click({ force: true });
                    cy.get('@resourceTitle').should('not.eq', resourceTitleInitialValue);
                    cy.get('@resourceDate').should('not.eq', resourceDateInitialValue);
                });
            });
            cy.get('#sorting-accordion-options').should('not.be.visible');
            cy.get('@resourceTitle').then((value) => {
                resourceTitleInitialValue = value;
            }).then(() => {
                cy.get('@resourceDate').then((value) => {
                    resourceDateInitialValue = value;
                }).then(() => {
                    cy.get('#sorting-accordion').click({ force: true });
                    cy.get('[id^="sorting-accordion-option-"]:nth-child(3)').click({ force: true });
                    cy.get('@resourceTitle').should('not.eq', resourceTitleInitialValue);
                    cy.get('@resourceDate').should('not.eq', resourceDateInitialValue);
                });
            });
        });

        it('Mobile: Sort by Z-A/A-Z feature properly sort resource cards', () => {
            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('ramadan', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.get('[id^="resource-title-"]:first').invoke('text').as('resourceTitle');
            cy.get('[id^="resource-publication-date-"]:first').invoke('text').as('resourceDate');

            let resourceTitleInitialValue;
            let resourceDateInitialValue;

            cy.get('@resourceTitle').then((value) => {
                resourceTitleInitialValue = value;
            }).then(() => {
                cy.get('@resourceDate').then((value) => {
                    resourceDateInitialValue = value;
                }).then(() => {
                    cy.get('#sorting-accordion').click({ force: true });
                    cy.get('[id^="sorting-accordion-option-"]:nth-child(5)').click({ force: true });
                    cy.get('@resourceTitle').should('not.eq', resourceTitleInitialValue);
                    cy.get('@resourceDate').should('not.eq', resourceDateInitialValue);
                });
            });
            cy.get('#sorting-accordion-options').should('not.be.visible');
            cy.get('@resourceTitle').then((value) => {
                resourceTitleInitialValue = value;
            }).then(() => {
                cy.get('@resourceDate').then((value) => {
                    resourceDateInitialValue = value;
                }).then(() => {
                    cy.get('#sorting-accordion').click({ force: true });
                    cy.get('[id^="sorting-accordion-option-"]:nth-child(4)').click({ force: true });
                    cy.get('@resourceTitle').should('not.eq', resourceTitleInitialValue);
                    cy.get('@resourceDate').should('not.eq', resourceDateInitialValue);
                });
            });
        });

        it('Mobile: Iconkey container should display on hover and on click', () => {
            cy.get('#mobile-clear-iconkey-component:visible').find('#iconkey-container').should('not.be.visible');
            cy.get('#mobile-clear-iconkey-component:visible').find('#iconkey-icon:visible').click({ force: true });
            cy.get('#mobile-clear-iconkey-component:visible').find('#iconkey-container:visible').should('exist');
            cy.get('#mobile-clear-iconkey-component:visible').find('#iconkey-icon:visible').click({ force: true });
            cy.get('#mobile-clear-iconkey-component:visible').find('#iconkey-container').should('not.be.visible');
        });

        it('Mobile: Apply filters feature works properly', () => {
            cy.intercept('POST', '/resource/searchbarQuery').as('searchbarQuery');
            cy.wait('@searchbarQuery');
            let filter;

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:first').click({ force: true });
            cy.get('[id^="filter-categories"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-categories"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueCategories = [...new Set(response.map(item => item.category))];
                expect(uniqueCategories.length).to.equal(1);
                expect(uniqueCategories[0]).to.equal(filter);
            });
            cy.get('#mobile-clear-filters-button').click({ force: true });
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:first').click({ force: true });
            cy.get('[id^="filter-subcategories"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-subcategories"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueSubcategories = [...new Set(response.map(item => item.subcategory))];
                expect(uniqueSubcategories.length).to.equal(1);
                expect(uniqueSubcategories[0]).to.equal(filter);
            });
            cy.get('#mobile-clear-filters-button').click({ force: true });
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:nth-child(2)').click({ force: true });
            cy.get('[id^="filter-resourceTypes"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-resourceTypes"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueResourceTypes = [...new Set(response.map(item => item.resourceType))];
                expect(uniqueResourceTypes.length).to.equal(1);
                expect(uniqueResourceTypes[0]).to.equal(filter);
            });
            cy.get('#mobile-clear-filters-button').click({ force: true });
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:nth-child(3)').click({ force: true });
            cy.get('[id^="filter-ageGroups"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-ageGroups"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueAgeGroups = [...new Set(response.map(item => item.ageGroup))];
                expect(uniqueAgeGroups.length).to.equal(1);
                expect(uniqueAgeGroups[0]).to.equal(filter);
            });
            cy.get('#mobile-clear-filters-button').click({ force: true });
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:nth-child(4)').click({ force: true });
            cy.get('[id^="filter-audiences"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-audiences"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueAudiences = [...new Set(response.map(item => item.audience))];
                expect(uniqueAudiences.length).to.equal(1);
                expect(uniqueAudiences[0]).to.equal(filter);
            });
            cy.get('#mobile-clear-filters-button').click({ force: true });
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:nth-child(5)').click({ force: true });
            cy.get('[id^="filter-cultures"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-cultures"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueCultures = [...new Set(response.map(item => item.culture))];
                expect(uniqueCultures.length).to.equal(1);
                expect(uniqueCultures[0]).to.equal(filter);
            });
            cy.get('#mobile-clear-filters-button').click({ force: true });
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:nth-child(6)').click({ force: true });
            cy.get('[id^="filter-languages"]:first').invoke('attr', 'id').then((id) => {
                const idArr = id.split(':');
                filter = idArr[idArr.length - 1].toLowerCase();
            });
            cy.get('[id^="filter-languages"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const response = interception.response.body.payload.resources;
                const uniqueLanguages = [...new Set(response.map(item => item.language))];
                expect(uniqueLanguages.length).to.equal(1);
                expect(uniqueLanguages[0]).to.equal(filter);
            });
            cy.get('#mobile-clear-filters-button').click({ force: true });
            cy.wait('@searchbarQuery');
        });

        it('Mobile: Remove filters from tags feature works properly', () => {
            cy.intercept('POST', '/resource/searchbarQuery').as('searchbarQuery');
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:first').click({ force: true });
            cy.get('[id^="filter-categories"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(1);
            });

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:first').click({ force: true });
            cy.get('[id^="filter-subcategories"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(2);
            });

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:nth-child(2)').click({ force: true });
            cy.get('[id^="filter-resourceTypes"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(3);
            });

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:nth-child(3)').click({ force: true });
            cy.get('[id^="filter-ageGroups"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(4);
            });

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:nth-child(4)').click({ force: true });
            cy.get('[id^="filter-audiences"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(5);
            });

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:nth-child(5)').click({ force: true });
            cy.get('[id^="filter-cultures"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(6);
            });

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:nth-child(6)').click({ force: true });
            cy.get('[id^="filter-languages"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(7);
            });

            cy.get('#filters-dropdown').click({ force: true });

            cy.get('[id^="filter-tag-remove-"]:first').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(6);
            });

            cy.get('[id^="filter-tag-remove-"]:first').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(5);
            });

            cy.get('[id^="filter-tag-remove-"]:first').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(4);
            });

            cy.get('[id^="filter-tag-remove-"]:first').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(3);
            });

            cy.get('[id^="filter-tag-remove-"]:first').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(2);
            });

            cy.get('[id^="filter-tag-remove-"]:first').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(1);
            });

            cy.get('[id^="filter-tag-remove-"]:first').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(0);
            });
        });

        it('Mobile: Remove filters by going back with browser works as expected', () => {
            cy.intercept('POST', '/resource/searchbarQuery').as('searchbarQuery');
            cy.wait('@searchbarQuery');

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:first').click({ force: true });
            cy.get('[id^="filter-categories"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(1);
            });

            cy.get('#filters-dropdown').click({ force: true });
            cy.get('[id^="filter-accordion-"]:first').click({ force: true });
            cy.get('[id^="filter-subcategories"]:first').click({ force: true });
            cy.get('#apply-filters-button').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(2);
            });

            cy.go('back');
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(1);
            });

            cy.go('back');
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(0);
            });

            cy.go('forward');
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(1);
            });

            cy.go('forward');
            cy.wait('@searchbarQuery').then((interception) => {
                const appliedFilters = interception.request.body.filters;
                const appliedFiltersCount = Object.values(appliedFilters).reduce(
                    (total, arr) => total + arr.length,
                    0
                );
                expect(appliedFiltersCount).to.equal(2);
            });
        });

        it('Mobile: Paging component changes pages properly', () => {
            cy.intercept('POST', '/resource/searchbarQuery').as('searchbarQuery');
            cy.wait('@searchbarQuery');

            cy.get('#mobile-searchbar-component:visible').find('#search-bar-input:visible').type('breastfeeding', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                expect(interception.request.body.terms).to.equal('breastfeeding');
                expect(interception.request.body.page).to.equal(1);
                expect(interception.response.body.payload.first).to.equal(0);
            });

            cy.get('#page-marker-2').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                expect(interception.request.body.terms).to.equal('breastfeeding');
                expect(interception.request.body.page).to.equal(2);
                expect(interception.response.body.payload.first).to.equal(12);
            });

            cy.get('#paging-carousel-spin-left').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                expect(interception.request.body.terms).to.equal('breastfeeding');
                expect(interception.request.body.page).to.equal(1);
                expect(interception.response.body.payload.first).to.equal(0);
            });

            cy.get('#paging-carousel-spin-right').click({ force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                expect(interception.request.body.terms).to.equal('breastfeeding');
                expect(interception.request.body.page).to.equal(2);
                expect(interception.response.body.payload.first).to.equal(12);
            });
        });

        it('Mobile: Resources per page works properly', () => {
            cy.intercept('POST', '/resource/searchbarQuery').as('searchbarQuery');
            cy.wait('@searchbarQuery');

            cy.get('#search-bar-input').type('breastfeeding', { force: true }).trigger('keydown', { keyCode: 13, force: true });
            cy.wait('@searchbarQuery').then((interception) => {
                expect(interception.request.body.terms).to.equal('breastfeeding');
                expect(interception.response.body.payload.resources.length).to.equal(12);
            });

            const rppOptions = [9, 18, 36, 72];

            rppOptions.map(((rpp, index) => {
                cy.get('#rpp-dropdow').click({ force: true });
                cy.get(`#rpp-accordion-option-${index}`).click({ force: true });
                cy.wait('@searchbarQuery').then((interception) => {
                    expect(interception.request.body.terms).to.equal('breastfeeding');
                    expect(interception.response.body.payload.resources.length).to.equal(rpp);
                });
            }));
        });

        it('Resources like and dislike feature works properly', () => {
            cy.get('[data-cy="feedback-resourceCard-like"]').eq(0).scrollIntoView({force: true});
            cy.clearLocalStorage();
            cy.intercept('POST', '/resource/userScore').as('userScoreSet');
            cy.get('[data-cy="feedback-resourceCard-like"]').eq(0).click({force: true});
            cy.wait('@userScoreSet').then((interception) => {
                expect(interception.request.body.caseNum).to.equal(0);
                expect(interception.response.body.success).to.equal(true);
                cy.wait(1000);
            });
            cy.get('[data-cy="feedback-resourceCard-like"]').eq(0).click({force: true});
            cy.wait('@userScoreSet').then((interception) => {
                expect(interception.request.body.caseNum).to.equal(2);
                expect(interception.response.body.success).to.equal(true);
                cy.wait(1000);
            });
            cy.get('[data-cy="feedback-resourceCard-dislike"]').eq(0).click({force: true});
            cy.wait('@userScoreSet').then((interception) => {
                expect(interception.request.body.caseNum).to.equal(1);
                expect(interception.response.body.success).to.equal(true);
                cy.wait(1000);
            });
            cy.get('[data-cy="feedback-resourceCard-dislike"]').eq(0).click({force: true});
            cy.wait('@userScoreSet').then((interception) => {
                expect(interception.request.body.caseNum).to.equal(4);
                expect(interception.response.body.success).to.equal(true);
                cy.wait(1000);
            });
            cy.get('[data-cy="feedback-resourceCard-like"]').eq(0).click({force: true});
            cy.wait('@userScoreSet').then(() => {
                cy.wait(1000);
                cy.get('[data-cy="feedback-resourceCard-dislike"]').eq(0).click({force: true});
                cy.wait('@userScoreSet').then((interception) => {
                    expect(interception.request.body.caseNum).to.equal(3);
                    expect(interception.response.body.success).to.equal(true);
                    cy.wait(1000);
                });
            });
            cy.get('[data-cy="feedback-resourceCard-like"]').eq(0).click({force: true});
            cy.wait('@userScoreSet').then((interception) => {
                expect(interception.request.body.caseNum).to.equal(5);
                expect(interception.response.body.success).to.equal(true);
                cy.wait(1000);
            });
        });
    });
});
