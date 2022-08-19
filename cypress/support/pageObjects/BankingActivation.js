class BankingActivation
{
    getInvalidNumber(){

        return cy.iframe().find('div[class="ng-star-inserted"] div[class="ng-star-inserted"]')
    }
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
        return cy.iframe().find('[class="action-btn btn activated-text ng-star-inserted"]').contains(' Mobile Banking Activated ')
    }
     getInternetActivatedMsg(){
        return cy.iframe().find('[class="action-btn btn activated-text ng-star-inserted"]').contains(' Internet Banking Activated ')
    }
    getNextBtn(){
        return cy.iframe().find('[class="btn next-btn"]')
    }
    getNextBtn1(){
        return cy.iframe().find('[class="btn unblock-btn"]')
    }
    getNextBtn2(){
        return cy.iframe().find('[class="btn unblock-btn ng-star-inserted"]')
    }
   
}
export default BankingActivation