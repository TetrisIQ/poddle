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
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillCreatePollPage1', (title, location, note) => {
    cy.get("form").find("input").eq(0).type(title);
    cy.get("form").find("input").eq(1).type(location);
    cy.get("form").find("input").eq(2).type(note);
    cy.get("form").submit();
})

Cypress.Commands.add('fillCreatePollPage2', (options) => {
    let key = 0;
    for (let optionsKey in options) {
        cy.get("form").find("input").eq(key).type(options[key])
        key++;
    }
    cy.get("form").submit();
})

Cypress.Commands.add('fillCreatePollPage4', (name) => {
    cy.get("form").find("input").clear().type(name);
    cy.get("form").submit();
})

Cypress.Commands.add('clickOnOption', (row, col) => {
    cy.get(`tbody tr:nth-child(${row + 2}) > td:nth-child(${col + 1})`).click()
})

Cypress.Commands.add('checkOption', (row, col, result = "yes" | "no" | "ifNeededBe") => {
    switch (result) {
        case "yes":
            cy.get(`tbody tr:nth-child(${row + 2}) > td:nth-child(${col + 1}) > .gb-gray-200 > svg`).should('have.css', 'fill').and('eq', 'rgb(34, 197, 94)')
            return;
        case "no":
            cy.get(`tbody tr:nth-child(${row + 2}) > td:nth-child(${col + 1}) > .gb-gray-200 > svg`).should('have.css', 'fill').and('eq', 'rgb(220, 38, 38)')
            return;
        case "ifNeededBe":
            cy.get(`tbody tr:nth-child(${row + 2}) > td:nth-child(${col + 1}) > .gb-gray-200 > svg`).should('have.css', 'fill').and('eq', 'rgb(234, 179, 8)')
            return;
    }
    cy.get("body").should("not.exist") // must fail No valid enum
})
Cypress.Commands.add('updatePoll', () => {
    cy.get("button").contains("Save").click()
});

Cypress.Commands.add('firstNotificationHeaderContainsText', (text = 1) => {
    return cy.get("#notificationArea > div > div > div > div > div").should("contain.text", text)
});





