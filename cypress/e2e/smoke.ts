import faker from "@faker-js/faker";

describe("smoke tests", () => {
  it("should allow you to make a contact with and without address, requiring name and email", () => {
    const testContact = {
      name: faker.lorem.words(1),
      email: faker.lorem.sentences(1),
      address: {
        street: faker.lorem.sentences(1),
        city: faker.lorem.words(1),
        state: faker.lorem.words(1),
      },
    };
    const emptyText = "Absolutely zero friends lmao 🤣";
    cy.visit("/");

    cy.findByRole("link", { name: /notes/i }).click();
    cy.findByText(emptyText);

    cy.findByRole("link", { name: /\+ new contact/i }).click();

    cy.findByRole("button", { name: /save/i }).click();
    cy.findByText(/required/i);

    cy.findByRole("textbox", { name: /name/i }).type(testContact.name);
    cy.findByRole("textbox", { name: /email/i }).type(testContact.email);
    cy.findByRole("button", { name: /save/i }).click();

    cy.findByRole("button", { name: /delete/i }).click();

    cy.findByText(emptyText);

    cy.findByRole("textbox", { name: /name/i }).type(testContact.name);
    cy.findByRole("textbox", { name: /email/i }).type(testContact.email);
    cy.findByRole("textbox", { name: /street/i }).type(testContact.email);
    cy.findByRole("textbox", { name: /city/i }).type(testContact.email);
    cy.findByRole("textbox", { name: /address/i }).type(testContact.email);
    cy.findByRole("button", { name: /save/i }).click();

    cy.findByRole("button", { name: /delete/i }).click();

    cy.findByText(emptyText);
  });
});
