import { faker } from '@faker-js/faker';
import names from '../../fixtures/registrationData/names.json'
import lastNames from '../../fixtures/registrationData/lastNames.json'
import emails from '../../fixtures/registrationData/emails.json'
import passwords from '../../fixtures/registrationData/passwords.json'
import reEnterPasswords from '../../fixtures/registrationData/reEnterPasswords.json'
import fullUsers from '../../fixtures/registrationData/fullUsers.json'

describe("Check registration form", () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get('.header_signin').should('be.visible').and('contain', 'Sign In').click()
        cy.get('.modal-footer .btn-link').should('be.visible').click()
    })

    describe.skip("'Name' field validation", () => {

        for (const { title, input, expected } of names) {
            it(title, () => {
                cy.get('.modal-content').first().within(() => {
                    cy.get('#signupName').type(input.name).should('have.value', input.name).blur()
                    if (expected.message) {
                        cy.get('.invalid-feedback').should('have.text', expected.message)
                        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
                    } else {
                        cy.get('.invalid-feedback').should('not.exist')
                    }
                })
            })
        }

        it("Empty 'Name' field should show error message", () => {
            cy.get('.modal-content').first().within(() => {
                cy.get('#signupName').focus().blur().should('have.css', 'border-color', 'rgb(220, 53, 69)')
                cy.get('.invalid-feedback').should('have.text', 'Name required')
            })

        })

    })

    describe.skip("'Last name' field validation", () => {

        for (const { title, input, expected } of lastNames) {
            it(title, () => {
                cy.get('.modal-content').first().within(() => {
                    cy.get('#signupLastName').type(input.lastName).should('have.value', input.lastName).blur()
                    if (expected.message) {
                        cy.get('.invalid-feedback').should('have.text', expected.message)
                        cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
                    } else {
                        cy.get('.invalid-feedback').should('not.exist')
                    }
                })
            })
        }

        it("Empty 'Last name' field should show error message", () => {
            cy.get('.modal-content').first().within(() => {
                cy.get('#signupLastName').focus().blur().should('have.css', 'border-color', 'rgb(220, 53, 69)')
                cy.get('.invalid-feedback').should('have.text', 'Last name required')
            })

        })

    })


    describe.skip("'Email' field validation", () => {

        for (const { title, input, expected } of emails) {
            it(title, () => {
                cy.get('.modal-content').first().within(() => {
                    cy.get('#signupEmail').type(input.email).should('have.value', input.email).blur()
                    if (expected.message) {
                        cy.get('.invalid-feedback').should('have.text', expected.message)
                        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)')
                    } else {
                        cy.get('.invalid-feedback').should('not.exist')
                    }
                })
            })
        }

        it("Empty 'Email' field should show error message", () => {
            cy.get('.modal-content').first().within(() => {
                cy.get('#signupEmail').focus().blur().should('have.css', 'border-color', 'rgb(220, 53, 69)')
                cy.get('.invalid-feedback').should('have.text', 'Email required')
            })

        })

    })

    describe.skip("'Password' field validation", () => {

        for (const { title, input, expected } of passwords) {
            it(title, () => {
                cy.get('.modal-content').first().within(() => {
                    cy.get('#signupPassword').type(input.password).should('have.value', input.password).blur()
                    if (expected.message) {
                        cy.get('.invalid-feedback').should('have.text', expected.message)
                        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
                    } else {
                        cy.get('.invalid-feedback').should('not.exist')
                    }
                })
            })
        }

        it("Empty 'Password' field should show error message", () => {
            cy.get('.modal-content').first().within(() => {
                cy.get('#signupPassword').focus().blur().should('have.css', 'border-color', 'rgb(220, 53, 69)')
                cy.get('.invalid-feedback').should('have.text', 'Password required')
            })

        })

    })

    describe.skip("'Re-enter password' field validation", () => {

        for (const { title, input, expected } of reEnterPasswords) {
            it(title, () => {
                cy.get('.modal-content').first().within(() => {
                    cy.get('#signupPassword').type(input.password).should('have.value', input.password).blur()
                    cy.get('#signupRepeatPassword').type(input.reEnterPassword).should('have.value', input.reEnterPassword).blur()
                    if (expected.message) {
                        cy.get('.invalid-feedback').should('have.text', expected.message)
                        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)')
                    } else {
                        cy.get('.invalid-feedback').should('not.exist')
                    }
                })
            })
        }

        it("Empty 'Re-enter password' field should show error message", () => {
            cy.get('.modal-content').first().within(() => {
                cy.get('#signupRepeatPassword').focus().blur().should('have.css', 'border-color', 'rgb(220, 53, 69)')
                cy.get('.invalid-feedback').should('have.text', 'Re-enter password required')
            })

        })


    })

    describe.skip("'Register' button functionality", () => {

        it("Button should be disabled when fields are empty", () => {
            cy.get('.modal-content').first().within(() => {
                cy.get('.btn-primary').should("contain", "Register").and('be.disabled')
            })
        })

        it("Button should be disabled when fields are incorrect", () => {
            const user = fullUsers[1];
            cy.get('.modal-content').first().within(() => {
                cy.get('#signupName').should('be.visible').type(user.input.name)
                cy.get('#signupLastName').should('be.visible').type(user.input.lastName)
                cy.get('#signupEmail').should('be.visible').type(user.input.email)
                cy.get('#signupPassword').should('be.visible').type(user.input.password)
                cy.get('#signupRepeatPassword').should('be.visible').type(user.input.reEnterPassword)
                cy.get('.btn-primary').should("contain", "Register").and('be.disabled');
            })

        })

        it("New user should be created when fields are correct", () => {
            const user = fullUsers[0];
            cy.get('.modal-content').first().within(() => {
                cy.get('#signupName').should('be.visible').type(user.input.name)
                cy.get('#signupLastName').should('be.visible').type(user.input.lastName)
                cy.get('#signupEmail').should('be.visible').type(user.input.email)
                cy.get('#signupPassword').should('be.visible').type(user.input.password)
                cy.get('#signupRepeatPassword').should('be.visible').type(user.input.reEnterPassword)
                cy.get('.btn-primary').should("contain", "Register").and('be.enabled')
            })
        })

    })

    it("Login after registration should be successful", () => {
        const user = {
            "name": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.number.bigInt({ min: 1, max: 999 }) + faker.internet.email(),
            "password": "Test1234",
        }
        cy.get('.modal-content').first().within(() => {
            cy.get('#signupName').should('be.visible').type(user.name)
            cy.get('#signupLastName').should('be.visible').type(user.lastName)
            cy.get('#signupEmail').should('be.visible').type(user.email)
            cy.get('#signupPassword').should('be.visible').type(user.password, { sensitive: true })
            cy.get('#signupRepeatPassword').should('be.visible').type(user.password, { sensitive: true })
            cy.get('.btn-primary').should("contain", "Register").and('be.enabled').click()
        })

        cy.get('.dropdown-toggle').click()
        cy.get('.dropdown-menu').within(() => {
            cy.contains('Logout').click()
        })
        cy.get('.header_signin').should('be.visible').and('contain', 'Sign In').click()
        cy.get('.modal-content').first().within(() => {
            cy.get('#signinEmail').should('be.visible').type(user.email)
            cy.get('#signinPassword').should('be.visible').type(user.password, { sensitive: true })
            cy.get('.btn-primary').should("contain", "Login").and('be.enabled').click()

        })
        cy.contains("You don’t have any cars in your garage").should('be.visible')
    })


})
