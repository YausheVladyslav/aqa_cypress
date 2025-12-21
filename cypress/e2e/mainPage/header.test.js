
describe.skip('Check footer buttons', () => {

    beforeEach(() => {
        cy.visit('/')

    })

    it("Sign up button should open registration modal", () => {
        cy.get('.btn-primary').should('be.visible').should('have.text', 'Sign up').click()
        cy.get('.modal-header .modal-title').should('have.text', 'Registration')
    })
})