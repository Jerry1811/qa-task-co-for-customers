import users, { INVALID_LOGIN_ERROR_MESSAGE } from '../../fixtures/login.data'
import { routes } from '../_helpers/routes'
import { devices } from '../_helpers/devices'
import {
  email_field,
  password_field,
  login_button,
  login_error_message,
} from '../../support/selectors/login.selectors'

const { validUser, invalidUser } = users

devices.map((device) => {
  describe(`Login tests @@ ${device.name}`, () => {
    const [w, h] = device.viewport

    before(() => {
      cy.viewport(w, h)
    })

    beforeEach(() => {
      cy.viewport(w, h)
      cy.intercept(routes.login).as('login')
      cy.intercept(routes.dashboard).as('dashboard')
      cy.intercept(routes.failed_login).as('loginFailed')
      cy.visit('/login')
    })

    it('Login with valid email and password', () => {
      cy.get(email_field).first().type(validUser.email)
      cy.get(password_field).type(validUser.password)
      cy.get(login_button).contains('Login').click()
      cy.wait(['@login', '@dashboard'])
      cy.location().should((loc) => {
        expect(loc.pathname).to.equal(routes.dashboard)
      })
    })

    it('Login with invalid email and password', () => {
      cy.get(email_field).first().type(invalidUser.email)
      cy.get(password_field).type(invalidUser.password)
      cy.get(login_button).contains('Login').click()

      cy.wait('@loginFailed').then(() => {
        cy.get(login_error_message)
          .should('be.visible')
          .and('contain', INVALID_LOGIN_ERROR_MESSAGE)
      })
      cy.location().should((loc) => {
        expect(loc.pathname).to.equal(routes.failed_login)
      })
    })
  })
})
