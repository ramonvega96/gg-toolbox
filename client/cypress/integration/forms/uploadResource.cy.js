/// <reference types="cypress" />

describe('Upload a resource form ', () => {
    context('Desktop', () => {
        beforeEach(() => {            
            cy.viewport('macbook-15');
            cy.visit('/upload-a-resource');
            cy.loadedGoogleReCAPTCHA();
        });

        it('Submit button should be disabled initially', () => {
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
        });

        it('Submit button should be disabled until form is complete - Resource URL', () => {
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#firstName').type('Test');
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#lastName').type('User');
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#emailAddress').type('test@user.com');
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#resourceTitle').type('Resource title test');
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#submissionType').click();
            cy.get('#dropdown-option-0').click();
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#resourceURL').type('https://validurl-test.com.au');
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');            
            cy.solveGoogleReCAPTCHA();
            cy.get('#submit-resource').click();
            cy.url().should('not.include', 'upload-a-resource');
        });

        it('Submit button should be disabled until form is complete - Resource PDF', () => {
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#firstName').type('Test');
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#lastName').type('User');
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#emailAddress').type('test@user.com');
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#resourceTitle').type('Resource title test');
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#submissionType').click();
            cy.get('#dropdown-option-1').click();
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#dropzone-file').selectFile('cypress/fixtures/sampleResource.pdf');
            cy.get('#submit-resource').click({ force: true });            
            cy.url().should('include', 'upload-a-resource');            
            cy.solveGoogleReCAPTCHA();
            cy.get('#submit-resource').click();
            cy.url().should('not.include', 'upload-a-resource');
        });
    });

    context('Mobile View', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/upload-a-resource');
            cy.loadedGoogleReCAPTCHA();            
        });

        it('Mobile: Submit button should be disabled initially', () => {
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
        });

        it('Mobile: Submit button should be disabled until form is complete - Resource URL', () => {
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#firstName').type('Test', { force: true });
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#lastName').type('User', { force: true });
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#emailAddress').type('test@user.com', { force: true });
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#resourceTitle').type('Resource title test', { force: true });
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#submissionType').click({ force: true });
            cy.get('#dropdown-option-0').click({ force: true });
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#resourceURL').type('https://validurl-test.com.au', { force: true });
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');            
            cy.solveGoogleReCAPTCHA();
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('not.include', 'upload-a-resource');
        });

        it('Mobile: Submit button should be disabled until form is complete - Resource PDF', () => {
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#firstName').type('Test', { force: true });
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#lastName').type('User', { force: true });
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#emailAddress').type('test@user.com', { force: true });
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#resourceTitle').type('Resource title test', { force: true });
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#submissionType').click({ force: true });
            cy.get('#dropdown-option-1').click({ force: true });
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('include', 'upload-a-resource');
            cy.get('#dropzone-file').selectFile('cypress/fixtures/sampleResource.pdf', { force: true });
            cy.get('#submit-resource').click({ force: true });            
            cy.url().should('include', 'upload-a-resource');            
            cy.solveGoogleReCAPTCHA();
            cy.get('#submit-resource').click({ force: true });
            cy.url().should('not.include', 'upload-a-resource');
        });
    });
});
