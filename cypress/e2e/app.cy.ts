describe('Navigation', () => {
  it('should load more customers', () => {
    cy.visit('http://localhost:3000/')

    cy.get('tbody tr').should('have.length', 20)
    cy.contains('a', 'Load more').click()
    cy.get('tbody tr').should('have.length', 40)
  })

  it('should search for customer', () => {
    cy.visit('http://localhost:3000/')

    cy.get('input').type('Fay')
    cy.get('tbody tr').should('have.length', 1)
    cy.contains('td', /^Fay/)
  })
})
