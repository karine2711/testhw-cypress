import { itemLocators } from "../itemPage/itemLocators";
import { searchResultsLocators } from "./searchResultsLocators";

class SearchResultsPage {
    elements = {
        relevantPrices: () => { return cy.get(searchResultsLocators.relevantPrices); },
        filterButton: () => { return cy.get(searchResultsLocators.filterButton); },
        vintageOption: () => { return cy.get(searchResultsLocators.vintageOption); },
        listedItems: () => { return cy.get(searchResultsLocators.listedItems); }
    }

    getAveragePrice() {
        return this.elements.relevantPrices()
            .then($prices => {
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
            })
    }

    sortByPriceLowToHigh() {
        cy.contains("button", "Sort by")
            .click()
            .siblings()
            .find("button[role = 'menuitemradio']")
            .contains(/Lowest Price|Price: low to high/i)
            .click()
    }

    filterByTypeVintage() {
        this.elements.filterButton().click()
        this.elements.vintageOption()
            .invoke("attr", "id")
            .then(id => {
                cy.get("label[for=" + id + "]").click()
            })
            .then(() => {
                cy.get("button[data-filter-form-apply-button]").click()
            })

    }

    openFirstItem() {
        this.elements.listedItems()
            .first()
            .find("a")
            .first()
            .invoke("removeAttr", "target")
            .click()
    }


    addTenthToFavorites() {
        this.elements.listedItems()
        .eq(10)
        .find(searchResultsLocators.addToFavorites)
        .click()
    }
}

export const searchResultsPage = new SearchResultsPage();