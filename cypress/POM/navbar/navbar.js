import { navbarLocators } from "./navbarLocators";

class Navbar {
    elements = {
        searchInput: () => {return cy.get(navbarLocators.searchInput);},
        searchButton: () =>  {return cy.get(navbarLocators.searchButton);},
        favorites: () =>  {return cy.get(navbarLocators.favorites);}
    }

    search(item) {
        this.elements.searchInput().clear().type(item);
        this.elements.searchButton().click()
    }

    goToFavorites(){
        this.elements.favorites().click()
    }
}

export const navbar = new Navbar();