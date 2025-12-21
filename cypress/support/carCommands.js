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
import { faker } from '@faker-js/faker';

Cypress.Commands.add('createDefaultCar',() => {
    cy.get(".panel-page .btn-primary").should('be.visible').click()
    cy.get('.modal-content').within(() => {
        cy.get('#addCarBrand').should('be.visible').invoke('text').should('not.be.empty')
        cy.get('#addCarModel').should('be.visible').invoke('text').should('not.be.empty')
        cy.get('#addCarMileage').should('be.visible').type(faker.number.int({ min: 1, max: 999998 }))
        cy.get('.btn-primary').should('be.visible').and('contain', 'Add').click()
    })
})