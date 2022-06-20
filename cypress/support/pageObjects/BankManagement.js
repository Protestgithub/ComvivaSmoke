class BankManagement{
    getBankMaster()
    {
        return cy.get('[title="Bank Master"]')
    }
    getProvider()
    {
        return cy.iframe().find('#fileUploadForm_providerId')
    }
    getProvider1()
    {
        return cy.iframe().find('select[id="fileUploadForm_providerId"]> option')
    }
    getBankName()
    {
        return cy.iframe().find('#fileUploadForm_bankName')
    }
    getPoolAccountNo()
    {
        return cy.iframe().find('input[name="poolAccountNo"]')
    }
    getBankId()
    {
        return cy.iframe().find('#fileUploadForm_bankId')
    }
    getBankType()
    {
        return cy.iframe().find('#bankType')
    }
    getBankType1()
    {
        return cy.iframe().find('#bankType> option')
    }
    getDefaultRoutingBank()
    {
        return cy.iframe().find('#defaultRoutingBank')
    }
    getPoolAccountType()
    {
        return cy.iframe().find('#fileUploadForm_poolAccType')
    }
    getPoolAccountType1()
    {
        return cy.iframe().find('#fileUploadForm_poolAccType> option')
    }
    getCBSType()
    {
        return cy.iframe().find('#fileUploadForm_cbsType')
    }
    getCBSType1()
    {
        return cy.iframe().find('#fileUploadForm_cbsType> option')
    }
    getPriority()
    {
        return cy.iframe().find('#fileUploadForm_priority')
    }
    getsubmitButton()
    {
        return cy.iframe().find('#submitButton')
    }
    getChooseFile()
    {
        return cy.iframe().find('#uplFile')
    }
    getAssert()
    {
        return cy.iframe().find('.actionMessage')
    }
    getSubmitButton()
    {
        return cy.iframe().find('#submitButton')
    }
    getMFSproviderBankTypeMaster()
    {
        return cy.get('#collapsible_listnode_2')
    }
    getModifyORDelete()
    {
        return cy.get('[title="Modify/Delete Bank"]')
    }
    getMFS1()
    {
        return cy.iframe().find('[name="mfsProviderId"]').eq(0)
    }
    getMFS2()
    {
        return cy.iframe().find('#MfsBankMapping_mfsProviderListForBankMapping_mfsProviderId102')
    }
    getMFS3()
    {
        return cy.iframe().find('#MfsBankMapping_mfsProviderListForBankMapping_mfsProviderId103')
    }
    getModify()
    {
        return cy.iframe().find('[value="Modify"]')
    }
    getDefaultBankType()
    {
        return cy.iframe().find('#MfsBankMapping_modifyBankMapping_defaultBankType')
    }
    getCheckBox(){
        return cy.iframe().find('[type="checkbox"]')
    }
    getModify1(){
        return cy.iframe().find('#MfsBankMapping_displayServicesForEditBankMapping_button_modify')
    }
    getAsserMessage()
    {
        return cy.iframe().find('[class="actionMessage"]')
    }
    getSelectAll()
    {
        return cy.iframe().find('#MfsBankMapping_displayServicesForEditBankMapping_checkAll')
    }
    getSubmit()
    {
        return cy.iframe().find('[value="Submit"]')
    }
    getErrorMessage()
    {
        return cy.iframe().find('.errorMessage')
    }
    /*
   
   
 
    get()
    {
        return cy.iframe().find('')
    }
    
    get()
    {
        return cy.iframe().find('')
    }
    get()
    {
        return cy.iframe().find('')
    }
    get()
    {
        return cy.iframe().find('')
    }
    get()
    {
        return cy.iframe().find('')
    }
    get()
    {
        return cy.iframe().find('')
    }*/

}
export default BankManagement