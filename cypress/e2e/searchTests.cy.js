

describe('Search Tests', () => {
  beforeEach(() => {
    cy.visit("https://www.etsy.com")
  })

  it('Search and sort by lowest price', () => {
    cy.get("form#gnav-search input[type='text']").type("earrings")
    cy.get("form#gnav-search button[type='submit']").click()
    cy.get('.n-listing-card__price .lc-price .currency-value').then($prices => {
      let totalPrice = 0;
      let count = 0;

      $prices.each((index, element) => {
        const priceText = Cypress.$(element).text();
        const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));
        if (!isNaN(price)) {
          totalPrice += price;
          count++;
        }
      });
      let averagePrice = count > 0 ? totalPrice / count : 0;
      return cy.wrap(averagePrice)
    }).then(averagePriceBeforeSort => {
      cy.log(averagePriceBeforeSort)
      cy.contains("button","Sort by")
           .click()
           .siblings()
           .find("button[role = 'menuitemradio']")
           .contains(/Price: low to high/i)
           .click()
     // cy.get("div[data-component-island-template='search2_neu/common/SPASortByMenuPreact/SortByMenu']")
    //  cy.contains("button","Sort by")
        
  
      cy.wait(3000)
      cy.get('.n-listing-card__price .lc-price .currency-value').then($prices => {
        let totalPrice = 0;
        let count = 0;

        $prices.each((index, element) => {
          const priceText = Cypress.$(element).text();
          const price = parseFloat(priceText.replace(/[^\d.-]/g, ''));
          if (!isNaN(price)) {
            totalPrice += price;
            count++;
          }
        });
        let averagePrice = count > 0 ? totalPrice / count : 0;
        expect(averagePrice).to.be.below(averagePriceBeforeSort)
      })
    })
  })

  it('Test filter by type', () => {
    cy.get("form#gnav-search input[type='text']").type("dresses")
    cy.get("form#gnav-search button[type='submit']").click()
    cy.get("#search-filter-button").click()
    cy.get('div[data-appears-component-name="item_type"] input[value="vintage"]')
      .invoke("attr", "id")
      .then(id => {
        cy.get("label[for=" + id + "]").click()
      })
      .then(() => {
        cy.get("button[data-filter-form-apply-button]").click()
      })

    cy.get(".v2-listing-card").first()
      .find("a")
      .first()
      .invoke("removeAttr", "target")
      .click()
    cy.get("#product_details_content_toggle").contains("Vintage").should('exist')
  })

  it('Add to favorites than remove', () => {
    cy.get("form#gnav-search input[type='text']").type("hats")
    cy.get("form#gnav-search button[type='submit']").click()
    cy.get(".v2-listing-card").first().find("button[data-accessible-btn-fave]").click()
    cy.wait(5000)
    cy.get("a[data-favorites-nav-link]").click()
    cy.get("ul[data-favorites-section]")
      .find('a.listing-link')
      .should('have.length', 1)
      .siblings()
      .find("div[data-btn-fave]")
      .click()
     
    cy.wait(5000)

    cy.reload()
    cy.get('ul[data-favorites-section]').should('not.exist');

  })
})