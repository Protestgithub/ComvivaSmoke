class BankingActivation
{
     getEnterCIFNumber(){
        return cy.iframe().find('#mat-input-0')
    }
    getSearchButton(){
        return cy.iframe().find('button[type="submit"]').eq(0).contains(' Search ')
    }
    getMobileBankingButton(){
        return cy.iframe().find('button.action-btn.btn.btn-primary').eq(1).contains('Activate Mobile')
    }
    getInternetBankingButton(){
        return cy.iframe().find('button.action-btn.btn.btn-primary').eq(2).contains('Activate Internet')
    }
    getConfirmButton(){
        return cy.iframe().find('div>button[class="unblock-btn btn"]')
    }
    getMobActivatedMsg(){
        return cy.iframe().find('[type="button"]').eq(1)
    }
    getInternetActivatedMsg(){
        return cy.iframe().find('[type="button"]').eq(2)
    }
   
}
export default BankingActivation