describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully login", () => {
    cy.login("test@test.com", "test");
    cy.get(".pt-2").should("have.text", "Добро пожаловать test@test.com");
  });

  it("Should not login with empty login", () => {
    cy.contains("Log in").click();
    cy.get("#mail").type(" ");
    cy.get("#pass").type("test");
    cy.contains("Submit").click();
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should not login with empty password", () => {
    cy.contains("Log in").click();
    cy.get("#mail").type("test@test.com");
    cy.contains("Submit").click();
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });


  it("add book by click add", () => {
    cy.login("test@test.com", "test");
    cy.createbook("Гарри Поттер", "Фэнтези", "Роулинг");
    cy.contains("Гарри Поттер").should("be.visible");
  });

   it("add to favorite book", () => {
    cy.login("test@test.com", "test");
    cy.get(
      "body > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)"
    ).click();
     cy.contains("Favorites").click();
     cy.contains("Властелин Колец").should("be.visible", true);
   });

   it("delete from favorite book", () => {
     cy.login("test@test.com", "test");
     cy.contains("Favorites").click();
     cy.get("button[class='btn btn-secondary']").click();
     cy.contains("Please add some book to favorit on home page!").should(
       "be.visible",
       true
     );
   });
});
