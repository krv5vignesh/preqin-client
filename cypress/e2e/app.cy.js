describe('Navigation', () => {
    it('grid should be available in the homepage', () => {
      cy.visit('http://localhost:3000/')
      cy.get('div.MuiDataGrid-root').should('exist');
    })

    it('Clicking on a row should navigate to investor details page', () => {
        cy.visit('http://localhost:3000/')
        cy.get('div.MuiDataGrid-row').first().click();
        cy.url().should('include', '/investor/');
    })

    it('Selecting a asset class should load the grid', () => {
        cy.visit('http://localhost:3000/investor/2670');
        cy.get('#asset-class-select').click();
        cy.get('li.MuiMenuItem-root').contains('pe').click();
        cy.get('div.MuiDataGrid-root').should('exist');
      })
  })