/// <reference types="cypress" />

import dayjs from "dayjs";

const title = "Test Title"
const location = "Test Location";
const note = "Test Note"
const options = ["Option 1", "Option 2", "Option 3"]
const user = "Cypress Test User";

describe('Create Poll - with Settings', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Yes, No, If Needed be', () => {

        // Click on create Poll button in header
        cy.get('button').contains("Create Poll").click();
        cy.fillCreatePollPage1(title, location, note);
        cy.fillCreatePollPage2(options);

        // click on YNINB
        cy.get("form").find("input").eq(0).click();
        cy.wait(1000) // Wait for animation
        cy.get("form").submit();
        cy.fillCreatePollPage4(user);

        // View Poll Page
        // Click one time on the first element
        cy.clickOnOption(1, 1);
        // CLick Twice on the second
        cy.clickOnOption(1, 2);
        cy.clickOnOption(1, 2);
        // Validate the output
        cy.checkOption(1, 1, "yes");
        cy.checkOption(1, 2, "ifNeededBe");
        cy.checkOption(1, 3, "no");
        // update the Poll
        cy.updatePoll();
        cy.reload();
        // Validate again after reload
        cy.checkOption(1, 1, "yes");
        cy.checkOption(1, 2, "ifNeededBe");
        cy.checkOption(1, 3, "no");

    })
    it('Deadline', () => {
        // Click on create Poll button in header
        cy.get('button').contains("Create Poll").click();
        cy.fillCreatePollPage1(title, location, note);
        cy.fillCreatePollPage2(options);

        cy.get("form").find("input").eq(3).click();
        cy.get("form button").contains("Choose Date").click()
        // click next day?
        cy.get(".month-dates").find(".day").eq(6).click()
        // click Continue
        cy.get(".contents").find("button").contains("Continue").click()
        cy.get("form").submit();
        cy.fillCreatePollPage4(user);
        cy.firstNotificationHeaderContainsText("Poll").click();
        cy.clickOnOption(1, 2);
        cy.checkOption(1, 2, "yes")
        cy.updatePoll();
        cy.clock(dayjs().add(2, "day").toDate())
        cy.get(".grid").find("div").should("contain.text", "is over");
    })

    it('Vote Limit - 1', () => {
        // Click on create Poll button in header
        cy.get('button').contains("Create Poll").click();
        cy.fillCreatePollPage1(title, location, note);
        cy.fillCreatePollPage2(options);

        cy.get("form").find("input").eq(2).click();
        cy.wait(1000) // Wait for animation
        cy.get("form").submit();
        cy.fillCreatePollPage4(user);

        // View Poll Page
        // Click one time on the first element
        cy.clickOnOption(1, 1);
        cy.clickOnOption(1, 2);
        cy.firstNotificationHeaderContainsText("Poll Created").click();
        // should show notification "Cannot update Poll"
        cy.updatePoll();
        cy.firstNotificationHeaderContainsText("Cannot update Poll").click()
        // fix poll (click on Option 1)
        cy.clickOnOption(1, 1);
        cy.updatePoll();
        cy.firstNotificationHeaderContainsText("Poll updated").click()
    });

})

