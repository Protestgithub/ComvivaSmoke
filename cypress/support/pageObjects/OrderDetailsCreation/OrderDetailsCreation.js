class OrderDetailsCreation{
   
   
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
        return cy.iframe().find('[class="button-primary btn-rounded"]')
    }

     getBankServices() {
        return cy.get('[data-testid="menu.bank_service"]')
    }

    getTransferToBank() {
        return cy.get('[data-testid="menu.bank_service"]').find('[title="Transfer to Bank"]')

    }
    getConfirmSubmitButton() {
        return cy.iframe().find('[class="button-primary btn-rounded sm-button ml-4"]')
    }

    getAssertMessage(){
        return cy.iframe().find('[class="snackbar flex items-center"]')

    }
    getInsufficientBalanceMessage(){
        return cy.iframe().find('.text-center > h2')
    }
     getSubmitOKButton() {
        return cy.iframe().find('.button-primary.btn-rounded')
    }
    
}
export default OrderDetailsCreation
