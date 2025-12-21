import { faker } from '@faker-js/faker';

describe("test describe", () => {

    beforeEach("Test title", () => {
        cy.visit('/')

    })

    it("first test", () => {
        const user = {
            "name": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.number.bigInt({ min: 1, max: 999 }) + faker.internet.email(),
            "password": "Test" + faker.number.bigInt({ min: 1000, max: 9999 }),
        }

        cy.get('.header_signin').should('be.visible').and('contain', 'Sign In').click()
        cy.get('.modal-footer .btn-link').should('be.visible').click()
        cy.get('.modal-content').first().within(() => {
            cy.get('#signupName').should('be.visible').type(user.name)
            cy.get('#signupLastName').should('be.visible').type(user.lastName)
            cy.get('#signupEmail').should('be.visible').type(user.email)
            cy.get('#signupPassword').should('be.visible').type(user.password, { sensitive: true })
            cy.get('#signupRepeatPassword').should('be.visible').type(user.password, { sensitive: true })
            cy.get('.btn-primary').should("contain", "Register").and('be.enabled').click()
        })
        cy.get('.panel-empty_message').should('be.visible').and('contain', "You don’t have any cars in your garage")

        cy.createDefaultCar()
        cy.addFuelExpensesToDefaultCar()

    })
})




