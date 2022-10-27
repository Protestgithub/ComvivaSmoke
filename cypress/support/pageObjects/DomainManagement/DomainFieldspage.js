class DomainFieldspage{
    getDomain(){
        
    }
    getDomainName(){
     return cy.iframe().find('#confirmAddDomain_viewDetail_domainName')
    }
    getDomainCode(){
    return cy.iframe().find('#confirmAddDomain_viewDetail_domainCode')
    }
    getDomainCategories(){
   return cy.iframe().find('#confirmAddDomain_viewDetail_noOfCategories')
    }
    getDomainSubmitbtn(){
    return cy.iframe().find('#confirmAddDomain_viewDetail_button_submit')
    }
    getDomainResetbtn(){
        return cy.iframe.find('#confirmAddDomain_viewDetail_button_reset')
    }
    getSUbMIT2(){
        return cy.iframe().find('#confirmAddDomain_getNonFinancialSerForCat_button_submit')
    }
    getErrormsg(){

        return cy.iframe().find('li .errorMessage')
    
    }
    getSuccessMsg()
    {
    return cy.iframe().find('.actionMessage')
    }
   }
   export default DomainFieldspage