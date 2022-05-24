import { routes } from '../routes'
import {
  confirm_booking,
  terms_and_conditions,
} from '../../../support/selectors/flightsBooking.selectors'
import {
  flying_from,
  search,
  to_destination,
  book_now_button,
  search_autocomplete_result,
} from '../../../support/selectors/flights.selectors'

export const searchFlight = () => {
  cy.get(flying_from)
    .type('cairo')
    .get(search_autocomplete_result)
    .eq(0)
    .contains('Cairo, Egypt')
    .click()

  cy.get(to_destination)
    .type('ankara')
    .get(search_autocomplete_result)
    .eq(0)
    .contains('Ankara, Turkey')
    .click()

  cy.get(search).click()
}

export const clickBookNowButton = () => {
  cy.get(book_now_button)
    .first()
    .click({ waitForAnimations: false, force: true })
  cy.location().should((loc) => {
    expect(loc.pathname).to.equal(routes.flight_booking)
  })
}

export const confirmBooking = () => {
  cy.get(terms_and_conditions).check({ force: true })
  cy.get(confirm_booking)
    .click()
    .then(() => {
      cy.url().should('include', routes.flight_booking_invoice)
    })
}
