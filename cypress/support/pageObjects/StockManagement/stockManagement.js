class stockManagement {
    getStockManagement() {
        return cy.get('[data-testid="menu.stock"]')
    }

    getStockTransferToEA() {
        return cy.get('[data-testid="menu.stock"]').find('[title="Stock Transfer to EA Initiation"]')

    }

    getMFSProvider() {
        return cy.iframe().find('select[id="mfsProviderList"]> option')
    }

    getMFSProviders() {
        return cy.iframe().find('select[id="mfsProviderList"]')
    }

    getReferenceNumber() {
        return cy.iframe().find('[id="stockTransferInit_confirmInitiate__refNo"]')

    }

    getTransferAmount() {
        return cy.iframe().find('[id="_requestedQuantity"]')
    }

    getEASubmitButton() {

        return cy.iframe().find('input[name="button.submit"]')

    }

    getEAConfirmButton() {
        return cy.iframe().find('[id="stockButt"]')
    }

    getStockInitiated() {
        return cy.iframe().find('[class="actionMessage"]')
    }
    //-------------RA-------------------------
    getStockTransferToRA() {
        return cy.get('[data-testid="menu.stock"]').find('[title="Stock Transfer to RA"]')

    }
    getRAReferenceNumber() {
        return cy.iframe().find('[id="stockInitLoyalty_confirmInitiate__refNo"]')

    }

    getRAMFSProvider() {
        return cy.iframe().find('select[name="providerName"]> option')
    }
    getRAMFSProvides() {
        return cy.iframe().find('select[name="providerName"]')
    }

    getRARequestedAmount() {
        return cy.iframe().find('[id="stockInitLoyalty_confirmInitiate__requestedQuantity"]')
    }
    getRASubmitButton() {

        return cy.iframe().find('input[id="stockInitLoyalty_confirmInitiate_button_submit"]')

    }
    getRAConfirmButton() {
        return cy.iframe().find('[id="stockButt"]')
    }

    getRAStockInitiated() {
        return cy.iframe().find('[class="actionMessage"]')
    }

    //-----------------------------------Stock Enquiry----------------------------


    getStockEnquiry() {
        return cy.get('[data-testid="menu.stock"]').find('[title="Stock Enquiry"]')
    }

    getTrasanctionID() {
        return cy.iframe().find('input[name="txnId"]')
    }

    getStockType() {
        return cy.iframe().find('select[id="serviceTypeA"]> option')
    }

    getStockTypes() {
        return cy.iframe().find('select[id="serviceTypeA"]')
    }

    getStockBackAssert()
    { return cy.iframe().find('select[class="tabcenter"]')
       
    }
    getStatus() {
        return cy.iframe().find('select[id="stockEnq_loadDetails_status"]')
    }
    getStockTypeB() {
        return cy.iframe().find('select[id="serviceTypeB"]')
    }
    getStockEnquirySubmit() {

        return cy.iframe().find('input[name="button.submit"]')

    }
    getStockEnquiryViewSubmit() {

        return cy.iframe().find('input[name="button.submit"]')

    }

    //-------------------Stock Transfer EA Enquiry--------------------

    getStockTransferEAEnquiry() {
        return cy.get('[data-testid="menu.stock"]').find('[title="Stock Transfer EA Enquiry"]')
    }
    getFromDate() {
        return cy.iframe().find('input[name="dojo.inputFromDate"]')
    }

    getToDate() {
        return cy.iframe().find('input[name="dojo.inputToDate"]')
    }

    getStockEnqLoadDetailsStatus() {
        return cy.iframe().find('select[id="stockEnq_loadDetails_status"]> option')
    }
    getStockEnqLoadDetailsStatuses() {
        return cy.iframe().find('select[id="stockEnq_loadDetails_status"]')
    }


    getStockEnqLoadDetailsButtonSubmit() {

        return cy.iframe().find('input[id="stockEnq_loadDetails_button_submit"]')
    }

    getTrasanctionIDRadioButton() {
        return cy.iframe().find('input[type="radio"][name="check"]').eq(0)
    }
    getStockEnqRViewButtonSubmit() {

        return cy.iframe().find('input[id="stockEnqR_view_button_submit"]')
    }

    //--------------------- reimbursement----------------------------------------

    getReimbursement() {
        return cy.get('[data-testid="menu.stock"]').find('[title="Reimbursement"]')
    }
    getUserType() {
        return cy.iframe().find('select[name="userType"]> option')
    }

    getUserTypes() {
        return cy.iframe().find('select[name="userType"]')
    }

    getMSISDN() {
        return cy.iframe().find('input[name="msisdn"]')
    }
    getProvider() {
        return cy.iframe().find('select[id="providerListSel"]> option')
    }
    getProviders() {
        return cy.iframe().find('select[id="providerListSel"]')
    }

    getWalletType() {
        return cy.iframe().find('select[id="otherWalletType"]> option', "{force:true}")
    }

    getWalletTypes() {
        return cy.iframe().find('select[id="otherWalletType"]', "{force:true}")
    }

    getReimbursementReferenceNumber() {
        return cy.iframe().find('input[id="withdraw_confirmDisplay_referenceNumber"]')
    }
    getReferenceDate() {
        return cy.iframe().find('input[name="dojo.referenceDate"]')
    }

    getRemark() {
        return cy.iframe().find('textarea[name="remark"]')
    }
    getOperatorInstrumentType() {
        return cy.iframe().find('input[type="radio"][name="operatorInstrumentType"]').eq(0)
    }
    getOperatorInstrumentTypes() {
        return cy.iframe().find(' tbody:nth-child(2) tr:nth-child(14) > td.tabcol:nth-child(2)')
    }

   
    getWithdrawconfirmDisplayButtonSubmit() {
        return cy.iframe().find('input[id="withdraw_confirmDisplay_button_submit"]')
    }
    getAccountNumber() {
        return cy.iframe().find('select[name="paymentMethodNumber"]')
    }

    getWithdrawConfirmDisplayAmount() {
        return cy.iframe().find('input[id="withdraw_confirmDisplay_amount"]')
    }
    getWithdrawconfirmDisplayButn() {
        return cy.iframe().find('input[id="withdraw_confirmDisplay_butn"]')
    }

    getReimbursementMessage()
    {
        return cy.iframe().find('.actionMessage')
    }

    //--------------------- reimbursement Approval----------------------------------------

    getStockReimbursementApproval() {
        return cy.get('[data-testid="menu.stock"]').find('[title="Stock Reimbursement Approval"]')
    }

    getReimbursementApproval() {
        return cy.iframe().find('input[type="radio"][name="check"]')
    }
    getWithdrawlActionApprovalButtonSubmit() {
        return cy.iframe().find('input[id="OPTWithdrawlActionApproval_displayTransactionDetails_button_submit"]')
    }

    getConfirmApprove() {
        return cy.iframe().find('input[id="confirmApprove"]')
    }

    getReimbursementApproveMessage()
    {
        return cy.iframe().find('.actionMessage')
    }


    //----------------------- Error Messages-----------------------------

    getStockWithdraw() {
        return cy.get('[data-testid="menu.stock"]').find('[title="Stock Withdrawal"]')

    }

    getWithdrawWalletType() {
        return cy.iframe().find('select[id="stockWithdraw_walletId"]')
    }

    getWithdrawAvailableBalance() {
        return cy.iframe().find('div.container:nth-child(2) table.wwFormTableC tbody:nth-child(2) tr:nth-child(2) td.tabcol:nth-child(3) > a:nth-child(1)')
    }

    getWithdrawBankName() {
        return cy.iframe().find('select[id="bankId"]> option')
    }

    getWithdrawBankNames() {
        return cy.iframe().find('select[id="bankId"]')
    }

    getWithdrawBankAccountNumber() {
        return cy.iframe().find('select[id="sel2"]> option')
    }

    getWithdrawBankAccountNumbes() {
        return cy.iframe().find('select[id="sel2"]')
    }

    getWithdrawAmount() {
        return cy.iframe().find('input[id="stockWithdraw_amount"]')
    } 

    getStockWithdrawButtonSubmit() {
        return cy.iframe().find('input[id="stockWithdraw_button_submit"]')
    }
    
    getStockWithdrwErrorMessage()
    {
        return cy.iframe().find('.errorMessage')
    }

    getStockInitRefNo()
    {
        return cy.iframe().find('input[id="stockInit_confirmInitiate__refNo"]')
    }

    getStockInitWithdrawAmount() {
        return cy.iframe().find('input[id="stockInit_confirmInitiate__requestedQuantity"]')
    } 

    getStockInitButtonSubmit() {
        return cy.iframe().find('input[id="stockInit_confirmInitiate_button_submit"]')
    }

    getStockInitErrorMessage()
    {
        return cy.iframe().find('.errorMessage')
    }

    getStockInitiation() {
        return cy.get('[data-testid="menu.stock"]').find('[title="Stock Initiation"]')

    }

    getStockEnquiryConfirmID()
    {
        return cy.iframe().find('input[id="stockEnq_view_transactionMap_transferId"]')
       
    }
    
    getReimbursementErrorMessage()
    {
        return cy.iframe().find('.errorMessage')
    }
    //----------------------- Stock Transfer EA Approval 1-------------------



    getStockEAApproval1() {

        return cy.get('[data-testid="menu.stock"]').find('[title="Stock Transfer to EA Approval -1"]')



    }



    getEAApprovalSubmitButton() {



        return cy.iframe().find('#stockTransferApprove1_approve_button_submit')



    }



    getEAApprovalConfirmButton() {

        return cy.iframe().find('[id="stockTransferApprove1_confirmApproval_button_approve"]')

    }



    //-------------------EA Approval 2---------------



    getStockEAApproval2() {

        return cy.get('[data-testid="menu.stock"]').find('[title="Stock Transfer to EA Approval -2"]')



    }

    getEAApproval2SubmitButton() {



        return cy.iframe().find('#stockTransferApprove2_approve_button_submit')

    }



    getEAApproval2ConfirmButton() {

        return cy.iframe().find('[id="stockTransferApprove2_confirmApproval_button_approve"]')

    }
}
export default stockManagement