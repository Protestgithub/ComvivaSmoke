class OrderDetailsCreations{
   
   
    getCurrency() {
        return cy.iframe().find('select[id="currency"]')
    }

    getWalletType() {
        return cy.iframe().find('select[id="fromWallet"]')
    }

    getAmount() {
        return cy.iframe().find('input[id="amount"]')
    }

    getBankAccountNumber() {
        return cy.iframe().find('select[id="toBankAccount"]')
    }

    getTransferButtonSubmit() {
        return cy.iframe().find('input[id="submit-form"]')
    }

     getBankServices() {
        return cy.get('[data-testid="menu.bank_service"]')
    }

    getTransferToBank() {
        return cy.get('[data-testid="menu.bank_service"]').find('[title="Transfer to Bank"]')

    }



   
}
export default OrderDetailsCreations