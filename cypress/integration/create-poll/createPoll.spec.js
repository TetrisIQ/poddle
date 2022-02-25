/// <reference types="cypress" />

const title = "Test Title"
const location = "Test Location";
const note = "Test Note"
const options = ["Option 1", "Option 2", "Option 3"]
const user = "Cypress Test User";

describe('Create Poll - Basic validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Create poll - Ok', () => {
        cy.get('button').contains("Create Poll").click();
        cy.fillCreatePollPage1(title, location, note);
        cy.fillCreatePollPage2(options);
        cy.get("form").submit();
        cy.fillCreatePollPage4(user);
        cy.firstNotificationHeaderContainsText("Poll Created").click();
        cy.clickOnOption(1, 1)
        cy.clickOnOption(1, 2)
        cy.clickOnOption(1, 3)
        cy.checkOption(1, 1, "yes")
        cy.checkOption(1, 2, "yes")
        cy.checkOption(1, 3, "yes")
        cy.updatePoll();
        cy.reload();
        cy.wait(1000)
        cy.checkOption(1, 1, "yes")
        cy.checkOption(1, 2, "yes")
        cy.checkOption(1, 3, "yes")

    })

    it('Create poll - without title', () => {
        cy.get("button").contains("Create Poll").click()
        cy.get("form").find("input").eq(1).type("Test Location");
        cy.get("form").find("input").eq(2).type("Test Note");
        cy.get("form").find("button").click()
        cy.get('.py-4 > .text-xl').should("contain.text", "Create new Poll")
    });


    it('Create poll - without Options', () => {
        cy.get("button").contains("Create Poll").click()
        cy.fillCreatePollPage1(title, location, note)
        cy.get("form").submit()
        // Check if notification contains red svg
        cy.firstNotificationHeaderContainsText("Cannot continue").click()
    })

    it('Create poll - with many and extra long Options', () => {
        cy.viewport(1920, 1080)
        cy.get('button').contains("Create Poll").click();
        cy.fillCreatePollPage1(title, location, note);
        cy.fillCreatePollPage2(["Option 1", "Option 2 is better than option 1", "But option 3 is still the best", "Option 4 is not the best, but works in most case", "This option is only the default fallback if we cannot agree with on of the others. So everyone should accept this."]);
        cy.get("form").submit();
        cy.fillCreatePollPage4(user);
        cy.firstNotificationHeaderContainsText("Poll Created").click()
        cy.screenshot()
    })
})
