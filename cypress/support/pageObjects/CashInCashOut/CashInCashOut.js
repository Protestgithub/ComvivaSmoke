class CashInCashOut
{

    getMSISDN(){

        return cy.iframe().find('#paymentMethodNumberId')
    
    }
    
    
    
    getProvider(){
    
        return cy.iframe().find('#partyProviderListSel')
    
    }
    
    getMSISDN(){
    
        return cy.iframe().find('#partyWalletListSel')
    
    }
    
    getAmount(){
    
        return cy.iframe().find('[name="amount"]')
    
    }
    
    getPaymentID(){
    
        return cy.iframe().find('[name="referenceNumber"]')
    
    }
    
    getSubmitButton(){
    
        return cy.iframe().find('#selectForm_button_submit')
    
    }

    getSubmitButton1(){
    
        return cy.iframe().find('#cashOutWeb_confirm_button_submit')
    
    }
    
    getConfirmButton(){
    
        return cy.iframe().find('#cashButt')
    
    }
    
    }

export default CashInCashOut
