const {ShoppingCartPage} = require("../../pages/shoppingCartPage");
const testData = require("../../fixtures/testData.json");

const shoppingCartobj = new ShoppingCartPage();

describe("Using cypress to automate shopping cart flow", ()=>{
    beforeEach(()=>{
        cy.login(testData.login.userName, testData.login.password) //Uses the baseUrl data in the cypress.config.js file
    })

    
})