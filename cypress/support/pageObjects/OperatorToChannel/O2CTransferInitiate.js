class O2CTransferInitiate
{
 getErrorMessage()
 {
    return cy.iframe().find('.errorMessage')
 }
 getErrorMessage1()
 {
   return cy.iframe().find('.actionMessage')
 }

 getMSISDN() 

 {

     return cy.iframe().find('input[name="msisdn"]')

 }

 getPayeeProvider()

 {

     return cy.iframe().find('select[id="providerListSel"]')

 }

 getPayeeWalletType()

 {

    return cy.iframe().find('select[id="otherWalletListId"]')

 }

 getTransferAmount()

 {

    return cy.iframe().find('input[name="amount"]')

 }

 getReferenceNumber()

 {

    return cy.iframe().find('input[name="referenceNumber"]')

 }

 getType()

 {

    return cy.iframe().find('select[id="o2cInitiate_confirm_paymentType"]')

 }

 getNumber()

 {

     return cy.iframe().find('input[name="paymentNumber"]')

 }

 getRemarks()

 {

    return cy.iframe().find('#o2cInitiate_confirm_remark')

 }

 getSubmitButton()

 {

    return cy.iframe().find('input[name="button.submit"]')

 }

 getConfirmButton()

 {

    return cy.iframe().find('input[id="o2cButt"]')

 }
 getRecentDatainO2C(){
   return cy.iframe().find('#o2cApproval1_displayTransactionDetails .wwFormTableC>tbody>tr>td','{force:true}').within(function(){
     cy.wait(2000)
      cy.get('input[type="radio"]').last().click()
    })
   }
}



export default O2CTransferInitiate