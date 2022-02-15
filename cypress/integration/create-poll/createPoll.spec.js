/// <reference types="cypress" />


describe('example to-do app', () => {
    beforeEach(() => {
        // cy.visit('http://localhost:3000')
    })

    it('Create poll - Ok', () => {
        cy.visit('http://localhost:3000')
        const title = "Test Title"
        const text = "Test Location";
        const note = "Test Note"
        const options = ["Option 1", "Option 2", "Option 3"]
        const user = "Cypress Test User";
        // Click on create Poll button in header
        cy.get('.container > .inline-flex').click()
        // Type title
        cy.get(':nth-child(2) > .relative > .rounded-md').type(title)
        // Type location
        cy.get(':nth-child(3) > .relative > .rounded-md').type(text)
        // Type note
        cy.get(':nth-child(4) > .relative > .rounded-md').type(note)
        // Click continue
        cy.get('.pt-4 > button').click()
        //fill first Option
        cy.get(':nth-child(3) > .relative > .rounded-md').type(options[0])
        //fill Second Option
        cy.get(':nth-child(4) > .relative > .rounded-md').type(options[1])
        //fill third Option
        cy.get(':nth-child(5) > .relative > .rounded-md').type(options[2])
        // click on last element so it's presen
        cy.get(':nth-child(5) > .relative > .rounded-md').click()

        // Click continue
        cy.get('.pt-4 > button').click()
        // Click continue
        cy.get('.pt-4 > button').click()
        //Type name
        cy.get(':nth-child(2) > .relative > .rounded-md').clear().type(user)
        // Click finish
        cy.get('.pt-4 > button').click()
        //Click Option 2
        cy.get(':nth-child(3) > .gb-gray-200 > input.s-tgccq2OiNLI-').click()
        //Click update
        cy.get('.py-4 > .inline-flex').click()
        // write Comment
        cy.get('.mb-2 > .bg-gray-100').clear().type("Cypress writing comments and so on :)")
        // Post comment
        cy.get('.-mr-1 > .bg-white').click()

        // Validate the result
        cy.get('.py-4 > .text-xl').contains("Test Title")


        cy.get(':nth-child(1) > .text-left > span').contains(text)

        cy.get(':nth-child(2) > .text-left > span').contains(note)

        cy.get('thead > tr > :nth-child(2)').contains(options[0])
        cy.get('thead > tr > :nth-child(3)').contains(options[1])
        cy.get('thead > tr > :nth-child(4)').contains(options[2])

        cy.reload()

        cy.get(':nth-child(3) > .gb-gray-200 > svg').should('have.css', 'fill').and('eq', 'rgb(34, 197, 94)')

    })

})
