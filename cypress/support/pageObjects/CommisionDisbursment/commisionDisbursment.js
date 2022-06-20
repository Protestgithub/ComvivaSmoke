class commisionDisbursment {
    getCommisionDisbursmentProcess() {
        return cy.get('[data-testid="menu.commdis"]')
    }

    getCommisionDisbursment() {
        return cy.get('[data-testid="menu.commdis"]').find('[title="Commission Disbursement"]')

    }

    getCDMFSProvider() {
        return cy.iframe().find('select[id="commissionDisbursementAction_validateDetails_providerId"]> option')
    }

    getCDMFSProviders() {
        return cy.iframe().find('select[id="commissionDisbursementAction_validateDetails_providerId"]')
    }

    getCDMSISDN() {
        return cy.iframe().find('input[name="msisdn"]')
    }

    getCDButtonSubmit() {
        return cy.iframe().find('input[id="commissionDisbursementAction_validateDetails_button_submit"]')
    }

    getCDCheckBox() {
        return cy.iframe().find('input[type="checkbox"][name="check1"]')
    }

    getCDDownloadCSVButton() {
        return cy.iframe().find('input[id="commissionDisbursementAction_input_button_exportToCSVForCommissionDisbursement"]')
    }


    //--------------------Bulk Payout Tool------------------

    getBulkPayoutTool() {
        return cy.get('[data-testid="menu.bulkpay"]')
    }

    getBulkPayoutInitiate() {
        return cy.get('[data-testid="menu.bulkpay"]').find('[title="Bulk Payout Initiate"]')

    }

    getFileUpload() {
        return cy.iframe().find('input[type="file"]')
    }

    getFileUploadSubmitButton() {
        return cy.iframe().find('.btn.waves-effect.waves-light.submitBtn')
    }

    getUploadCSVAlertSuccess() {
        return cy.iframe().find('.alert alert-success')

    }


}
export default commisionDisbursment