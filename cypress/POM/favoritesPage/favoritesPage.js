import { favoritesLocators } from "./favoritesLocators";

class FavoritesPage {
    elements = {
        favoritesSection: () => { return cy.get(favoritesLocators.favoritesSection)},
        favoriteItems: () => { return cy.get(favoritesLocators.favoritesSection).find(favoritesLocators.listedItem);}
    }

    unfavorite(item){
        item.siblings()
        .find("div[data-btn-fave]")
        .click()
    }
}



export const favoritesPage = new FavoritesPage();