class transferToUnregistred
{
    getTransferToUnregistred() {
        return cy.get('[data-testid="test-TRANSUNREG"]')
    }

    
    getTransferToUnregistredServiceType()
    {
        return cy.iframe().find('[id="transferToUnregistered_input_serviceTypeP2PNONREG"]').eq(0)
    }
   
    getTransferToUnregistredSubmit()
    {
        return cy.iframe().find('[id="transferToUnregistered_input_update"]')
    }

    getTransferToUnregisteredMSISDN()
    {
        return cy.iframe().find('[id="transferToUnregistered_submit_msisdn"]')
        
    }
    getTransferToUnregistredSubmitUpdate()
    {
        return cy.iframe().find('[id="transferToUnregistered_submit_update"]')
    }
 getAssertMessage()

    {

        return cy.iframe().find('span[class="errorMessage"]')

    }
   
}
export default transferToUnregistred