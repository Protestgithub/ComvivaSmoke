class PricingEnginePage {

    getCommissionTab() {

        return cy.iframe().find('#main-menu-commission-service-selector')

    }
    getServiceChargeHeader() {
        return cy.iframe().find('h5.page-heading')
    }

    getSubmitPolicy() {
        return cy.iframe().find('a.btn-floating.modal-trigger.cta-background-color.submit-rules')
    }

    getSubmitBtn() {
        return cy.iframe().find('a.modal-action.modal-close.center-align.submit-for-approval-btn')
    }

    getServiceChargeTab() {
        return cy.iframe().find('#main-menu-service-charge-service-selector')
    }
    getPricingCalculator() {
        return cy.iframe().find('#policy-calculator-serviceSelector')
    }
    getFundTransfer() {
        return cy.iframe().find('[title="Fund Transfer"]')
    }
    getSenderBankName() {
        return cy.iframe().find('[data-bind="with: senderSelector"] [class="col s5 input-select"] [class="browser-default control"]').eq(0)
    }
    getSenderSVAType() {
        return cy.iframe().find('[data-bind="with: senderSelector"] [class="col s5 input-select"] [class="browser-default control"]').eq(1)
    }
    getSenderRole() {
        return cy.iframe().find('[data-bind="with: senderSelector"] [class="col s5 input-select required"] [class="browser-default control"]').eq(0)
    }
    getSenderHierarchy() {
        return cy.iframe().find('[data-bind="with: senderSelector"] [class="col s5 input-select required"] [class="browser-default control"]').eq(1)
    }
    getSenderGrade() {
        return cy.iframe().find('[data-bind="with: senderSelector"] [class="col s5 input-select required"] [class="browser-default control"]').eq(2)
    }
    getReceiverBankName() {
        return cy.iframe().find('[data-bind="with: receiverSelector"] [class="col s5 input-select"] [class="browser-default control"]').eq(0)
    }
    getReceiverSVAType() {
        return cy.iframe().find('[data-bind="with: receiverSelector"] [class="col s5 input-select"] [class="browser-default control"]').eq(1)
    }
    getReceiverRole() {
        return cy.iframe().find('[data-bind="with: receiverSelector"] [class="col s5 input-select required"] [class="browser-default control"]').eq(0)
    }
    getReceiverHierarchy() {
        return cy.iframe().find('[data-bind="with: receiverSelector"] [class="col s5 input-select required"] [class="browser-default control"]').eq(1)
    }
    getReceiverGrade() {
        return cy.iframe().find('[data-bind="with: receiverSelector"] [class="col s5 input-select required"] [class="browser-default control"]').eq(2)
    }
    getCurrencyType() {
        return cy.iframe().find('[id="currencyType"]')
    }
    getTransactionAmt() {
        return cy.iframe().find('[id="calculator-transactionAmount"]')
    }
    getTransactionDateTime() {
        return cy.iframe().find('[id="calculator-transactionDateTime"]')
    }
    getBearerCode() {
        return cy.iframe().find('[id="bearerCode"]')
    }
    getCalculate() {
        return cy.iframe().find('[class="btn calculator-btn"]')
    }
    getCashIN() {
        return cy.iframe().find('[title="Cash In"]')
    }
    getActiveOrInactive() {
        return cy.iframe().find('[class="switch-label"]').eq(1)
    }
    getActiveOrInactive1() {
        return cy.iframe().find('[class="switch-label"]').eq(2)
    }
    getSearchTab() {
        return cy.iframe().find('[class="search-placeholder"]')
    }
    getSearchButton() {
        return cy.iframe().find('[type="submit"]')
    }
    getRule() {
        return cy.iframe().find('[class="truncate rule-policy-name"]')
    }
    getPolicy() {
        return cy.iframe().find('[class="truncate rule-policy-type"]')
    }
    getStatus() {
        return cy.iframe().find('[class="rule-status"]')
    }
    getValidity() {
        return cy.iframe().find('[class="validity-details"]')
    }
    getPolicyVersionLink() {
        return cy.iframe().find('[class="version-button"]')
    }
    getPolicyVersionInPut() {
        return cy.iframe().find('#policy-version')
    }
    getProceedButton() {
        return cy.iframe().find('#open-policy-version')
    }
    
    getRuleName() {
        return cy.iframe().find('.rule-name')
    }
    getMinCharge() {
        return cy.iframe().find('[for="ruleBased-min-charge"]')
    }
    getMaxCharge() {
        return cy.iframe().find('[for="ruleBased-max-charge"]')
    }
    //----------------------------------Calander Objects--------------------------------------
    getDatePickerStart() {
        return cy.iframe().find('#charge-rule-0-start-date')
    }
    getDatePickerEnd() {
        return cy.iframe().find('#charge-rule-0-end-date')
    }

    getCurrentDateSelect() {
        return cy.iframe().find('.xdsoft_date.xdsoft_current').filter(':visible')
    }
    getCalanderStart() {
        return cy.iframe().find('.xdsoft_datepicker.active:nth-child(1)')
    }
    getNavigateForwardStart() {
        return cy.iframe().find('.xdsoft_next').eq(2)
    }
    getNavigateBackStart() {
        return cy.iframe().find('.xdsoft_prev').eq(2)
    }
    getMonthNamerStart() {
        return cy.iframe().find('.xdsoft_label.xdsoft_month').eq(1).click().find('.xdsoft_option')
    }
    getYearNameStart() {
        return cy.iframe().find('.xdsoft_label.xdsoft_year').eq(1).click().find('.xdsoft_option')
    }
    getCalanderDaysStart() {
        return cy.iframe().find('.xdsoft_date')
    }
    //------------------------------------------------------------------------------------------
    getSaveDraftBtn() {
        return cy.iframe().find('[class="fixed-action-btn horizontal"]')
    }
    getWhoPays() {
        return cy.iframe().find('[id="charge-rule-0-charge-statement-0-charge-payer"]')
    }
    getSVAType() {
        return cy.iframe().find('[id="charge-rule-0-charge-statement-0-charge-payer-product"]')
    }
    getWhomeToPay() {
        return cy.iframe().find('[id="charge-rule-0-charge-statement-0-charge-receiver"]')
    }
    getChargeStatmentPricing() {
        return cy.iframe().find('[id="charge-statement-0-flat"]')
    }
    getPricingPercntage() {
        return cy.iframe().find('div.col.s6.input-field.no-margin.no-padding')
    }
    getPricingFixedAmt() {
        return cy.iframe().find('div.col.input-field.no-margin.s6').eq(1)
    }
    getPolicyName() {
        return cy.iframe().find('span.truncate')
    }
    
    //Added 
    getSenderRoleCom() {
        return cy.iframe().find('[data-bind="ifnot: operatorAllowsMultipleValues"] select[class="browser-default control"]').eq(0)
    }
    getSenderHierarchyCom() {
        return cy.iframe().find('[data-bind="ifnot: operatorAllowsMultipleValues"] select[class="browser-default control"]').eq(1)
    }
    getSenderGradeCom() {
        return cy.iframe().find('[data-bind="if: hasReferenceData"] select[class="browser-default control selectized"]')
    }
    getSenderGradeCom1() {
        return cy.iframe().find('[data-bind="if: operatorAllowsMultipleValues"] [class="selectize-input items not-full has-options"]')
    }

    getSenderGradeCom2() {
        return cy.iframe().find('[class="selectize-dropdown-content"]>div').eq(0)
    }
    getGradebtnclick() {
        return cy.iframe().find('div.col.s4 > label')
    }
    getSenderComNew() {

        return cy.iframe().find('div.selectize-input items not-full has-options focus input-active dropdown-active')
    }
    getnextmonth(){
        return cy.iframe().find('.xdsoft_mounthpicker>.xdsoft_next').eq(1)
    }
    getRuleName1(){
        return cy.iframe().find('.truncate.rule-name')
    }
    getCurrentPolicyVersion(){
        return cy.iframe().find('[data-bind="text: activePolicyVersion"]')
    }
    getAddNewRuleBtn() {
        return cy.iframe().find('[data-bind="click: addNewChargeRule"]')
    }
    getSavedDraftPageTitle() {
        return cy.iframe().find('.alert.alert-info.float-reverse')
    }
    getRuleName2(){
        return cy.iframe().find('.row.rule-name-truncate')
    }
    getCloneButton() {
        return cy.iframe().find('.btn.waves-effect.waves-cta.clone-rule-button.modal-trigger')
    }
    getServiceChargeRule() {
        return cy.iframe().find('div.service-charge-rule')
    }
    getCloneService() {
        return cy.iframe().find('.col.s3')
    }
    getCloneButton1() {
        return cy.iframe().find('[class="modal-action modal-close center-align submit-for-approval-btn"]').eq(1)
    }
}
export default PricingEnginePage