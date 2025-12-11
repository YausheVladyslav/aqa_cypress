
describe('Check footer buttons', () => {

    const TELEGRAM_PATH = 't.me/ithillel_kyiv'
    const YOUTUBE_PATH = 'youtube.com/user/HillelITSchool'
    const INSTAGRAM_PATH = 'instagram.com/hillel_itschool/'
    const LINKEDIN_PATH = 'linkedin.com/school/ithillel/'
    const FACEBOOK_PATH = 'facebook.com/Hillel.IT.School'

    beforeEach(() => {
        cy.visit('/')

    })

    it("Facebook button should have correct parameters", () => {
        cy.get('.icon-facebook').should('be.visible')
        cy.get('.socials_link:has(.icon-facebook)')
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href')
            .and('contain', FACEBOOK_PATH)
    })

    it("Telegram button should have correct parameters", () => {
        cy.get('.icon-telegram').should('be.visible')
        cy.get('.socials_link:has(.icon-telegram)')
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href')
            .and('contain', TELEGRAM_PATH)
    })

    it("YouTube button should have correct parameters", () => {
        cy.get('.icon-youtube').should('be.visible')
        cy.get('.socials_link:has(.icon-youtube)')
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href')
            .and('contain', YOUTUBE_PATH)
    })

    it("Instagram button should have correct parameters", () => {
        cy.get('.icon-instagram').should('be.visible')
        cy.get('.socials_link:has(.icon-instagram)')
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href')
            .and('contain', INSTAGRAM_PATH)
    })

    it("linkedin button should have correct parameters", () => {
        cy.get('.icon-linkedin').should('be.visible')
        cy.get('.socials_link:has(.icon-linkedin)')
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href')
            .and('contain', LINKEDIN_PATH)
    })
})