
import { navbar } from "../POM/navbar/navbar";
import { searchResultsPage } from "../POM/searchResultsPage/searchResultsPage"
import { itemPage } from "../POM/itemPage/itemPage";
import { favoritesPage } from "../POM/favoritesPage/favoritesPage";

describe('Search Tests', () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it('Search and sort by lowest price', () => {
    navbar.search("earrings")
    searchResultsPage
      .getAveragePrice()
      .then(averagePriceBeforeSort => {
        searchResultsPage.sortByPriceLowToHigh()
        cy.wait(3000)
        searchResultsPage.getAveragePrice().then(averagePriceAfterSort =>
          expect(averagePriceAfterSort).to.be.below(averagePriceBeforeSort))
      })
  })

  it('Test filter by type', () => {
    navbar.search("dresses")
    searchResultsPage.filterByTypeVintage()
    searchResultsPage.openFirstItem()
    itemPage.elements.productDetails().contains("Vintage").should('exist')
  })

  it('Add to favorites than remove', () => {
    navbar.search("hats")
    searchResultsPage.addTenthToFavorites()
    cy.wait(5000)
    navbar.goToFavorites()
    favoritesPage.elements.favoriteItems()
      .should('have.length', 1)
      .then (item => {
        favoritesPage.unfavorite(item)
      })
    cy.wait(5000)
    cy.reload()
    favoritesPage.elements.favoritesSection().should('not.exist');
  })
})