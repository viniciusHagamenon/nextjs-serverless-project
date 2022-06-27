import { createCustomer } from '../../test-utils/customers'

describe('Navigation', () => {
  it('should add customer', () => {
    const customer = createCustomer()

    cy.visit('http://localhost:3000/')

    cy.get('a[href*="add-customer"]').click()

    cy.get('input[id*="name"]').type(customer.Name)
    cy.get('input[id*="country"]').type(customer.Country)
    cy.get('input[id*="vat"]').type(customer.Vat)
    cy.get('input[id*="email"]').type(customer.Email)
    cy.get('input[id*="phone"]').type(customer.Phone)
    cy.get('input[id*="website"]').type(customer.Website)
    cy.get('input[id*="image"]').type(customer.Image)

    cy.get('a[data-testid="add-customer-submit"]').click()

    cy.url().should('include', '/')

    cy.get('div').contains(customer.Name)
  })
})
