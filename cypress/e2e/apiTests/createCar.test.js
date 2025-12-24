import { faker } from '@faker-js/faker';
import 'cypress-plugin-api'
import user from '../apiTests/user.json'

describe("Create car", () => {

    // beforeEach("log in before each test", () => {


    // })

    it.skip("Created car data shoul match the response data", () => {
        cy.visit('/')
        cy.createUser()
        cy.wait(1000)
        cy.get(".btn-primary").should("be.visible").and("be.enabled").click()
        cy.get(".modal-content").within(() => {
            cy.api("/api/cars/brands").then((response) => {
                expect(response.status).to.equal(200)
                const brandsResponse = response.body.data
                const randomCarBrand = brandsResponse[faker.number.int({ min: 0, max: brandsResponse.length - 1 })]
                cy.get("#addCarBrand").select(randomCarBrand.title, { force: true }).should("contain.text", randomCarBrand.title)

                cy.api(`/api/cars/models?carBrandId=${randomCarBrand.id}`).then((response) => {
                    expect(response.status).to.equal(200)
                    const modelsResponse = response.body.data
                    const randomModel = modelsResponse[faker.number.int({ min: 0, max: modelsResponse.length - 1 })]
                    cy.get("#addCarModel").select(randomModel.title, { force: true }).should("contain.text", randomModel.title)
                    const mileage = faker.number.int({ min: 0, max: 999999 })
                    cy.get('#addCarMileage')
                        .should('exist')
                        .clear({ force: true })
                        .type(mileage, { force: true })
                        .invoke('val')
                        .should('not.be.empty')

                    cy.intercept('POST', '/api/cars').as("getCreatedCarRequest")

                    cy.get('.btn-primary').should('be.enabled').click({ force: true })

                    cy.wait('@getCreatedCarRequest').its('response.body').then((response) => {
                        const responseBody = JSON.stringify(response.data)
                        console.log("RESPONSE: \n" + JSON.stringify(response.data))
                        expect(responseBody).to.contain(randomModel.title)
                        expect(responseBody).to.contain(randomCarBrand.title)
                        expect(responseBody).to.contain(mileage)

                    })
                })
            })
        })
    })

    it("create a car with expenses should be success", () => {

        const password = `Testqa${faker.number.int({ min: 100, max: 1000 })}`
        const userData = {
            "name": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": password,
            "repeatPassword": password
        }

        //sign up a new user
        cy.api({ method: 'POST', url: '/api/auth/signup', body: userData })
            .its('status').should('equal', 201)

        //log in by user was registered above
        cy.api({
            method: 'POST', url: '/api/auth/signin', body: {
                email: userData.email,
                password: userData.password,
                remember: false
            }
        }).its('status').should('equal', 200)

        //get car brands to use it for creating a car
        cy.api({ method: 'GET', url: '/api/cars/brands' })
            .then((brandsResponse) => {
                expect(brandsResponse.status).to.equal(200)
                const brandsData = brandsResponse.body.data
                console.log(brandsData)
                const randomCarBrand = brandsData[faker.number.int({ min: 0, max: brandsData.length - 1 })]
                console.log(randomCarBrand)

                //get car models to use it for creating a car
                cy.api({ method: 'GET', url: '/api/cars/models' })
                    .then((modelsResponse) => {
                        expect(modelsResponse.status).to.equal(200)
                        const modelsData = modelsResponse.body.data
                        const carModelsByBrand = modelsData.filter(model => model.carBrandId == randomCarBrand.id)
                        const randomCarModelOfBrand = carModelsByBrand[faker.number.int({ min: 0, max: carModelsByBrand.length - 1 })]
                        console.log(modelsData)
                        console.log(carModelsByBrand)
                        console.log(randomCarModelOfBrand)

                        //create a car
                        const requestMileage = faker.number.int({ min: 0, max: 999999 })
                        cy.api({
                            method: 'POST', url: '/api/cars', body: {
                                carBrandId: randomCarBrand.id,
                                carModelId: randomCarModelOfBrand.id,
                                mileage: requestMileage
                            }
                        }).then((carResponse) => {
                            expect(carResponse.status).to.equal(201)
                            expect(carResponse.body.data.brand).to.equal(randomCarBrand.title)
                            expect(carResponse.body.data.model).to.equal(randomCarModelOfBrand.title)
                            expect(carResponse.body.data.mileage).to.equal(requestMileage)

                            // add expenses
                            const litersRequest = faker.number.int({ min: 0, max: 9999 })
                            const totalCostRequest = faker.number.int({ min: 0, max: 9999 })
                            const reportDateRequest = new Date()
                            cy.api({
                                method: 'POST', url: '/api/expenses', body: {
                                    "carId": carResponse.body.data.id,
                                    "reportedAt": reportDateRequest,
                                    "mileage": requestMileage + 1,
                                    "liters": litersRequest,
                                    "totalCost": totalCostRequest,
                                    "forceMileage": false
                                }
                            }).then((expensesResponse) => {
                                expect(expensesResponse.status).to.equal(200)
                                expect(expensesResponse.body.data.carId).to.equal(carResponse.body.data.id)
                                expect(expensesResponse.body.data.reportedAt).to.equal(reportDateRequest)
                                expect(expensesResponse.body.data.mileage).to.equal(requestMileage + 1)
                                expect(expensesResponse.body.data.liters).to.equal(litersRequest)
                                expect(expensesResponse.body.data.totalCost).to.equal(totalCostRequest)
                            })
                        })
                    })
            })
    })
})