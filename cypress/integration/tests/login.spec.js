import users, { INVALID_LOGIN_ERROR_MESSAGE } from '../../fixtures/login.data'
import { routes } from '../_helpers/routes'
import { devices } from '../_helpers/devices'
import {
  login_error_message,
  signup_button,
} from '../../support/selectors/login.selectors'
import {
  reset_password_modal_title,
  reset_password,
} from '../../support/selectors/resetPassword.selectors'

const { validUser, invalidUser } = users

devices.map((device) => {
  describe(`Login tests @@ ${device.name}`, () => {
    const [w, h] = device.viewport

    before(() => {
      cy.viewport(w, h)
    })

    beforeEach(() => {
      cy.viewport(w, h)
      cy.visit(routes.login)
    })

    it('Login with valid email and password', () => {
      cy.intercept(routes.login).as('login')
      cy.intercept(routes.dashboard).as('dashboard')

      cy.login(validUser.email, validUser.password)
      cy.wait(['@login', '@dashboard'])
      cy.location().should((loc) => {
        expect(loc.pathname).to.equal(routes.dashboard)
      })
    })

    it('Login with invalid email and password', () => {
      cy.intercept(routes.failed_login).as('loginFailed')

      cy.login(invalidUser.email, invalidUser.password)
      cy.wait('@loginFailed').then(() => {
        cy.get(login_error_message)
          .should('be.visible')
          .and('contain', INVALID_LOGIN_ERROR_MESSAGE)
      })
      cy.location().should((loc) => {
        expect(loc.pathname).to.equal(routes.failed_login)
      })
    })

    it('Clicking signup button should navigate user to signup page', () => {
      cy.contains(signup_button).click({ force: true })
      cy.location().should((loc) => {
        expect(loc.pathname).to.equal(routes.signup)
      })
    })

    it('Reset password modal should pop-up when reset password link is clicked', () => {
      cy.get(reset_password_modal_title).should('not.be.visible')
      cy.contains(reset_password)
        .click({ waitForAnimations: false })
        .then(() => {
          cy.get(reset_password_modal_title).should('be.visible')
        })
    })
  })
})
