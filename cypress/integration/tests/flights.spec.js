import { devices } from '../_helpers/devices'
import { routes } from '../_helpers/routes'
import users from '../../fixtures/login.data'
import {
  address,
  country,
  email,
  firstname,
  lastname,
  nationality,
  phone,
} from '../../support/selectors/flightsBooking.selectors'
import {
  clickBookNowButton,
  confirmBooking,
  searchFlight,
} from '../_helpers/flights/flightHelper'
import { personalInformation } from '../../fixtures/flights.data'

const { validUser } = users
const {
  firstName,
  lastName,
  userEmail,
  phoneNumber,
  userAddress,
  countryAndNationality,
} = personalInformation

devices.map((device) => {
  describe(`Flights test @@ ${device.name}`, () => {
    const [w, h] = device.viewport

    before(() => {
      cy.viewport(w, h)
    })

    beforeEach(() => {
      cy.viewport(w, h)
    })

    it(`Book a flight - Logged out @@ ${device.name}`, () => {
      cy.visit(routes.flights)
      searchFlight()
      clickBookNowButton()

      // fill personal information
      cy.get(firstname).type(firstName)
      cy.get(lastname).type(lastName)
      cy.get(email).type(userEmail)
      cy.get(phone).type(phoneNumber)
      cy.get(address).type(userAddress)
      cy.get(country).type(`${countryAndNationality}{enter}`)
      cy.get(nationality).type(`${countryAndNationality}{enter}`)

      confirmBooking()
    })

    it(`Book a flight - Logged in @@ ${device.name}`, () => {
      cy.visit(routes.login)

      cy.intercept(routes.login).as('login')
      cy.intercept(routes.dashboard).as('dashboard')
      cy.login(validUser.email, validUser.password)
      cy.wait(['@login', '@dashboard'])

      // navigates to flights page
      if (device.isMobile) {
        cy.get('.menu-toggler').first().click()
      }
      cy.contains('flights')
        .click()
        .then(() => {
          cy.location().should((loc) => {
            expect(loc.pathname).to.equal(routes.flights)
          })
        })

      searchFlight()
      clickBookNowButton()
      confirmBooking()
    })
  })
})
