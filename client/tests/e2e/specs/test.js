// https://docs.cypress.io/api/introduction/api.html
const adminEmail = 'admin@test.com'
const adminPass = 'admin123'

const emp1 = {
  email: 'cypress1@test.com',
  pass: 'test123',
  name: 'Cypress1'
}
const emp2 = {
  email: 'cypress2@test.com',
  pass: 'test123',
  name: 'Cypress2'
}

describe('e2e', () => {
  it('Login as Admin', () => {
    cy.visit('/')
    cy.get('#email').type(adminEmail)
    cy.get('#password').type(adminPass)
    cy.get('#submit').click()
  })
  it('Create 2 employees', () => {
    cy.get('#navEmployee').click()

    cy.get('#newEmployee').click()
    cy.get('#employeeName').type(emp1.name)
    cy.get('#employeeEmail').type(emp1.email)
    cy.get('#employeePassword').type(emp1.pass)
    cy.get('#employeeCreate').click()
    cy.contains(emp1.name)

    cy.get('#newEmployee').click()
    cy.get('#employeeName').type(emp2.name)
    cy.get('#employeeEmail').type(emp2.email)
    cy.get('#employeePassword').type(emp2.pass)
    cy.get('#employeeCreate').click()
    cy.contains(emp2.name)
    cy.get('.employeeDelete').last().click()
    cy.get('.employeeDelete').last().click()
  })
})
