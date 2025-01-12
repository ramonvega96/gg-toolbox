// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loadedGoogleReCAPTCHA', () => {
  // Wait until the iframe (Google reCAPTCHA) is totally loaded.
  cy.get('[title="reCAPTCHA"]', { timeout: 5000 }).should('be.visible').scrollIntoView();
});

Cypress.Commands.add('solveGoogleReCAPTCHA', () => {
    // Wait until the iframe (Google reCAPTCHA) is totally loaded. Then solve it.
    cy.get('[title="reCAPTCHA"]', { timeout: 5000 })
      .then((recaptchaIframe) => {
        const body = recaptchaIframe.contents();
        cy.wrap(body).find('.recaptcha-checkbox-border', { timeout: 5000 }).should('be.visible').click({ force: true });
        cy.wrap(body).find('.recaptcha-checkbox-border').should('not.be.visible');
        cy.wait(2000);
    })
});

Cypress.Commands.add('administratorLogin', () => {
  cy.get('#username').type('cypressAdminUser');
  cy.get('#password').type('cypressAdminPwd');
  cy.get('#login-button').click({ force: true });
  cy.url().should('not.include', 'login');
});

Cypress.Commands.add('verifyDownload', (fileName) => {
    return cy.exec(`find ${Cypress.config('downloadsFolder')} -name "${fileName}"`).then((result) => {
        return result.stdout.trim() !== '';
    });
});
