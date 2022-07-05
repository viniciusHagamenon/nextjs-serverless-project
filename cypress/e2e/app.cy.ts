describe('Navigation', () => {
  it('should load more customers', () => {
    cy.visit('http://localhost:3000/')

    cy.get('tbody tr').should('have.length', 30)
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(0)
    cy.scrollTo('bottom')
    cy.get('tbody tr').should('have.length', 60)
  })

  it('should search for customer', () => {
    cy.intercept('*').as('getCustomers')

    cy.visit('http://localhost:3000/')

    cy.wait('@getCustomers')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(0)

    cy.get('input').type('Fay')
    cy.get('tbody tr').should('have.length', 1)
    cy.contains('td', /^Fay/)
  })
})
