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
Cypress.Commands.add('clearAllNotifivationHeader', () => {
    return cy.get("#notificationArea > div").each(el => el.click())
});


Cypress.Commands.add('changeUser', (newUserName , newIndexRow) => {
    cy.get("table > tbody td").eq(0).find("svg").click();
    cy.wait(100)
    cy.get(`tbody tr:nth-child(${newIndexRow + 2}) > td:nth-child(${1})`).find("input").clear().type(newUserName+ "{enter}")
});


Cypress.Commands.add('editUser', (rowIndex) => {
    cy.get(`tbody tr:nth-child(4) > td`).last().click()
});




