/// <reference types="cypress" />

const title = "Test Title"
const location = "Test Location";
const note = "Test Note"
const options = ["Option 1", "Option 2", "Option 3"]
const user = "Cypress Test User";
const comment = "Cypress writing comments and so on :)"

describe('Test poll comments', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('button').contains("Create Poll").click();
        cy.fillCreatePollPage1(title, location, note);
        cy.fillCreatePollPage2(options);
        cy.get("form").submit();
        cy.fillCreatePollPage4(user);
        cy.firstNotificationHeaderContainsText("Poll Created").click()

    })

    it('Write a comment - basic', () => {
        // write comment
        cy.get('.mb-2 > .bg-gray-100').clear().type(comment)
        // Post comment
        cy.get('input[type=submit]').contains("Post").click();
        // Validate the result
        cy.get("div.text-left.ml-2").should("contain.text", comment);
        cy.reload();
        cy.wait(1000)
        cy.get("div.text-left.ml-2").should("contain.text", comment);
    })

    it('Write a comment - change name', () => {
        // write comment
        cy.get("form").find("select").select(1)
        cy.get('.mb-2 > .bg-gray-100').clear().type(comment)
        // Post comment
        cy.get('input[type=submit]').contains("Post").click();
        // Validate the result
        cy.get(".text-right.col-end-2 > span").should("contain.text", "Anonymous");
        cy.get("div.text-left.ml-2").should("contain.text", comment);
        cy.reload();
        cy.wait(2000)
        cy.get(".text-right.col-end-2 > span").should("contain.text", "Anonymous");
        cy.get("div.text-left.ml-2").should("contain.text", comment);




    })
})
