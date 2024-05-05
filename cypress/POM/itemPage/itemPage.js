import { itemLocators } from "./itemLocators";

class ItemPage {
    elements = {
        productDetails: () => { return cy.get(itemLocators.productDetails); }
    }
}

export const itemPage = new ItemPage();