class OrderDetailsCreations{
   
    getTransferToBankOption() {

        return cy.get('[data-testid="test-TRANSFER_TO_BANK"]')
    }

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

    


   
}
export default OrderDetailsCreations