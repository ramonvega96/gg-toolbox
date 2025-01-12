/// <reference types="cypress" />

describe('Admin panel features', () => {
    context('Desktop', () => {
        beforeEach(() => {            
            cy.viewport('macbook-15');
            cy.visit('/login');
            cy.administratorLogin();
        });

        it('Export resources data should download csv file', () => {
            cy.get('#export-resources-data-button').click();
            cy.wait(500);
            const fileName = 'resources_data.csv';
            cy.verifyDownload(fileName).should('equal', true);
        });

        it('Update resources should report case A properly: Add original resource', () => {
            cy.get('#export-resources-data-button').click();
            cy.wait(500);
            const fileName = 'resources_data.csv';
            cy.verifyDownload(fileName).should('equal', true);
            
            const filePath = Cypress.config('downloadsFolder') + "/" + fileName;
            const originalResource = `9999,"Resource Title","https://test.com","Resource suite","https://test.com","Publisher","https://stluc.manta.uqcloud.net",0,"Resource type","Resource description","Category","Subcategory","Audience","Age group",0,"0","english","English","","","","Tag",0,0,0,0,0,0,0,0,0,0,0,0`
            
            cy.readFile(filePath).then((csvContent) => {
                let updatedCsvContent = csvContent + '\n' + originalResource;
                cy.writeFile(filePath, updatedCsvContent);
            });

            cy.get('#dropzone-file').selectFile(filePath);
            cy.get('#update-resources-data-button').click();
            cy.get('#update-preview-summary').should('include.text', 'The following original resource will be added.');
            cy.get('#confirm-resources-data-update').click();
            cy.get('li').should('include.text', 'Resource 9999 was successfully added.');
        });

        it('Update resources should report case E properly: Delete original resource', () => {
            cy.get('#export-resources-data-button').click();
            cy.wait(500);
            const fileName = 'resources_data.csv';
            cy.verifyDownload(fileName).should('equal', true);
            
            const filePath = Cypress.config('downloadsFolder') + "/" + fileName;
            
            cy.readFile(filePath).then((csvContent) => {
                let rows = csvContent.trim().split('\n');
                rows.pop();
                let updatedCsvContent = rows.join('\n');
                cy.writeFile(filePath, updatedCsvContent);
            });

            cy.get('#dropzone-file').selectFile(filePath);
            cy.get('#update-resources-data-button').click();
            cy.get('#update-preview-summary').should('include.text', 'The following original resource will be deleted.');
            cy.get('#confirm-resources-data-update').click();
            cy.get('li').should('include.text', 'Resource 9999 was successfully deleted.');
        });

        it('Update resources should report case B properly: Add translated resource and its original', () => {
            cy.get('#export-resources-data-button').click();
            cy.wait(500);
            const fileName = 'resources_data.csv';
            cy.verifyDownload(fileName).should('equal', true);
            
            const filePath = Cypress.config('downloadsFolder') + "/" + fileName;
            const originalResource = `9998,"Resource Title","https://test.com","Resource suite","https://test.com","Publisher","https://stluc.manta.uqcloud.net",0,"Resource type","Resource description","Category","Subcategory","Audience","Age group",999,"999","english","English","","","","Tag",0,0,0,0,0,0,0,0,0,0,0,0`
            const translatedResource = `9999,"Resource Title","https://test.com","Resource suite","https://test.com","Publisher","https://stluc.manta.uqcloud.net",0,"Resource type","Resource description","Category","Subcategory","Audience","Age group",999,"999-01","spanish","Español","","","","Tag",0,0,0,0,0,0,0,0,0,0,0,0`

            cy.readFile(filePath).then((csvContent) => {
                let updatedCsvContent = csvContent + '\n' + originalResource + '\n' + translatedResource;
                cy.writeFile(filePath, updatedCsvContent);
            });

            cy.get('#dropzone-file').selectFile(filePath);
            cy.get('#update-resources-data-button').click();
            cy.get('#update-preview-summary').should('include.text', 'The following original resource will be added.');
            cy.get('#right-arrow').click();
            cy.get('#update-preview-summary').should('include.text', 'The following translated version of an original resource being added along, will be added.');
            cy.get('#confirm-resources-data-update').click();
            cy.get('li').eq(0).should('include.text', 'Resource 9998 was successfully added.');
            cy.get('li').eq(1).should('include.text', 'Resource 9999 was successfully added.');
        });

        it('Update resources should report case D and E properly: Delete original resource and its translated version', () => {
            cy.get('#export-resources-data-button').click();
            cy.wait(500);
            const fileName = 'resources_data.csv';
            cy.verifyDownload(fileName).should('equal', true);
            
            const filePath = Cypress.config('downloadsFolder') + "/" + fileName;
            
            cy.readFile(filePath).then((csvContent) => {
                let rows = csvContent.trim().split('\n');
                rows.pop();
                rows.pop();
                let updatedCsvContent = rows.join('\n');
                cy.writeFile(filePath, updatedCsvContent);
            });

            cy.get('#dropzone-file').selectFile(filePath);
            cy.get('#update-resources-data-button').click();
            cy.get('#update-preview-summary').should('include.text', 'The following translated version of an original resource, will be deleted.');
            cy.get('#right-arrow').click();
            cy.get('#update-preview-summary').should('include.text', 'The following original resource will be deleted.');
            cy.get('#confirm-resources-data-update').click();
            cy.get('li').eq(0).should('include.text', 'Resource 9999 was successfully deleted.');
            cy.get('li').eq(1).should('include.text', 'Resource 9998 was successfully deleted.');
        });

        it('Update resources should report case C properly: Add translated resource and its original', () => {
            cy.get('#export-resources-data-button').click();
            cy.wait(500);
            const fileName = 'resources_data.csv';
            cy.verifyDownload(fileName).should('equal', true);
            
            const filePath = Cypress.config('downloadsFolder') + "/" + fileName;
            const originalResource = `9997,"Resource Title","https://test.com","Resource suite","https://test.com","Publisher","https://stluc.manta.uqcloud.net",0,"Resource type","Resource description","Category","Subcategory","Audience","Age group",999,"999","english","English","","","","Tag",0,0,0,0,0,0,0,0,0,0,0,0`
            const translatedResource = `9998,"Resource Title","https://test.com","Resource suite","https://test.com","Publisher","https://stluc.manta.uqcloud.net",0,"Resource type","Resource description","Category","Subcategory","Audience","Age group",999,"999-01","spanish","Español","","","","Tag",0,0,0,0,0,0,0,0,0,0,0,0`

            cy.readFile(filePath).then((csvContent) => {
                let updatedCsvContent = csvContent + '\n' + originalResource + '\n' + translatedResource;
                cy.writeFile(filePath, updatedCsvContent);
            });

            cy.get('#dropzone-file').selectFile(filePath);
            cy.get('#update-resources-data-button').click();
            cy.get('#update-preview-summary').should('include.text', 'The following original resource will be added.');
            cy.get('#right-arrow').click();
            cy.get('#update-preview-summary').should('include.text', 'The following translated version of an original resource being added along, will be added.');
            cy.get('#confirm-resources-data-update').click();
            cy.get('li').eq(0).should('include.text', 'Resource 9997 was successfully added.');
            cy.get('li').eq(1).should('include.text', 'Resource 9998 was successfully added.');
            cy.get('#done-button').click();

            cy.get('#export-resources-data-button').click();
            cy.wait(500);
            cy.verifyDownload(fileName).should('equal', true);
            const newTranslatedResource = `9999,"Resource Title","https://test.com","Resource suite","https://test.com","Publisher","https://stluc.manta.uqcloud.net",0,"Resource type","Resource description","Category","Subcategory","Audience","Age group",999,"999-02","dari","درى (Dari)","","","","Tag",0,0,0,0,0,0,0,0,0,0,0,0`


            cy.readFile(filePath).then((csvContent) => {
                let updatedCsvContent = csvContent + '\n' + newTranslatedResource;
                cy.writeFile(filePath, updatedCsvContent);
            });
            
            cy.get('#dropzone-file').selectFile(filePath);
            cy.get('#update-resources-data-button').click();
            cy.get('#update-preview-summary').should('include.text', 'The following translated version of an existing original resource, will be added.');
            cy.get('#confirm-resources-data-update').click();
            cy.get('li').eq(0).should('include.text', 'Resource 9999 was successfully added.');
            cy.get('#done-button').click();
            
            cy.get('#export-resources-data-button').click();
            cy.wait(500);
            cy.verifyDownload(fileName).should('equal', true);
            cy.readFile(filePath).then((csvContent) => {
                let rows = csvContent.trim().split('\n');
                rows.pop();
                rows.pop();
                rows.pop();
                let updatedCsvContent = rows.join('\n');
                cy.writeFile(filePath, updatedCsvContent);
            });

            cy.get('#dropzone-file').selectFile(filePath);
            cy.get('#update-resources-data-button').click();            
            cy.get('#update-preview-summary').should('include.text', 'The following translated version of an original resource, will be deleted.');
            cy.get('#right-arrow').click();
            cy.get('#update-preview-summary').should('include.text', 'The following translated version of an original resource, will be deleted.');
            cy.get('#right-arrow').click();
            cy.get('#update-preview-summary').should('include.text', 'The following original resource will be deleted.');
            cy.get('#confirm-resources-data-update').click();
            cy.get('li').eq(0).should('include.text', 'Resource 9998 was successfully deleted.');
            cy.get('li').eq(1).should('include.text', 'Resource 9999 was successfully deleted.');
            cy.get('li').eq(2).should('include.text', 'Resource 9997 was successfully deleted.');
        });
    });

    context('Mobile View', () => {
        beforeEach(() => {
            cy.viewport('iphone-6');
            cy.visit('/login');
            cy.administratorLogin();            
        });

        it('Mobile Export resources data should download csv file', () => {
            cy.get('#export-resources-data-button').click();
            cy.wait(500);
            const fileName = 'resources_data.csv';
            cy.verifyDownload(fileName).should('equal', true);
        });
    });
});
