import { devices } from '../_helpers/devices'
import { routes } from '../_helpers/routes'

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
    })

    it(`Book a flight - Logged in @@ ${device.name}`, () => {
      cy.visit(routes.flights)
    })
  })
})
