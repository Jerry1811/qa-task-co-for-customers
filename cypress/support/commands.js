import {
  email_field,
  password_field,
  login_button,
} from './selectors/login.selectors'

Cypress.Commands.add('login', (email, password) => {
  cy.get(email_field).first().type(email)
  cy.get(password_field).type(password)
  cy.get(login_button).contains('Login').click()
})
