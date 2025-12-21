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

Cypress.Commands.add('addFuelExpensesToDefaultCar', () => {
    cy.get('.sidebar_btn .icon-fuel').should('be.visible').click()
    cy.get('.btn-primary').should('be.visible').and('be.enabled').click()
    cy.get('.modal-content').within(() => {

        cy.get('#addExpenseMileage')
            .should('be.visible')
            .should('not.have.value', '')
            .invoke('val')
            .then(Number)
            .then(mileage => {
                cy.get('#addExpenseMileage').clear().type(mileage + 1)
            })

        cy.get('#addExpenseLiters').should('be.visible').type(faker.number.int({ min: 1, max: 9999 }))
        cy.get('#addExpenseTotalCost').should('be.visible').type(faker.number.int({ min: 1, max: 1000000 }))
        cy.get('.btn-primary').should('be.visible').and('contain', 'Add').click()
    })

    cy.get('.panel-page .panel-page_content .font-weight-bold').should('be.visible').invoke('text').should('not.be.empty')
})