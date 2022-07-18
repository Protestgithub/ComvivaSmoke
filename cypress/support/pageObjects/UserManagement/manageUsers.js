class manageUsers {

    getUsermanagement() {
        return cy.get('[data-testid="menu.user_management"]')
    }

    getManageUsers() {
        return cy.get('[data-testid="menu.user_management"]').find('[title="Manage Users"]')
    }
    getViewDetailsUser() {

        return cy.iframe().find('span.font-weight-bold')

    }
getDateRangeAssert() {
        return cy.iframe().find('.modal-label.more-details-header')
    }
    getViewIcon() {
        return cy.iframe().find('[data-test-id="view-all-details"]')
    }
    getViewDetails() {
        return cy.iframe().find('span.font-weight-bold')
    }
    getAssertMobile(){
    return cy.iframe().find('[class="mat-tooltip-trigger ng-star-inserted"]')
    }

    getSuspendIcon() {
        return cy.iframe().find('.mat-tooltip-trigger.ng-star-inserted')
    }
    getCommentBox() {
        return cy.iframe().find('#reason')
    }
    getconfirm() {
        return cy.iframe().find('#confirm')
    }
     getWalletHistory(){
        return cy.iframe().find('.mat-tab-label-content')
    }
  getSearchTransactionID(){
        return cy.iframe().find('#search-transaction-id')
    }
    getsucessSYS() {
        return cy.iframe().find('p.text-center')
    }
    getdelete() {
        return cy.iframe().find('button[id="delete-user"] img')
    }
    getSubmitSuspendResumeButton() {
        return cy.iframe().find('#submit-suspendresume')
    }
    getdropdown() {
        return cy.iframe().find('#user-type')

    }
    getEditIcon() {
        return cy.iframe().find('[data-test-id="modify-user"]')
    }
    getEditToolTip() {
        return cy.iframe().find('[class="mat-tooltip-trigger"]')
    }
    getDailogbox() {
        return cy.iframe().find('#reason')
    }
    getYesbtn() {
        return cy.iframe().find('#submit-suspendresume')
    }
    getMore() {
        return cy.iframe().find('span[class="mat-button-wrapper"] mat-icon')
    }
    getCredentials() {
        return cy.iframe().find('#credentials')
    }
    getResetbttn() {
        return cy.iframe().find('#reset-credentials span mat-icon').eq(0)
    }
    getConfirmReset() {
        return cy.iframe().find('#submit-reset span[class="mat-button-wrapper"]')
    }
    getConfirmButton() {
        return cy.iframe().find('[data-test-id="confirm"]')
    }
    getNextbttn() {
        return cy.iframe().find('button[id="next"]')

    }
    getSearchUser() {
        return cy.iframe().find('input[data-test-id="user-search-details"]')
    }

    getUserSearchDetails() {
        return cy.iframe().find('input[id="user-search-details"]')
    }
    getSearchUserButton() {
        return cy.iframe().find('[id="search-user"]')
    }
    getViewAllDetailsButton() {
        return cy.iframe().find('[id="view-all-details"]')
    }

    getOrderDetailsButton() {
        return cy.iframe().find('[id="mat-tab-label-0-1"]')
    }

    getAccountInfo() {
        return cy.iframe().find('#mat-tab-label-0-3')
    }
    getlockunclockWallets() {
        return cy.iframe().find('#lock-unlock')
    }
    getLockOutgoingPayements() {
        return cy.iframe().find('.mat-dialog-actions button[type="submit"]')
    }
    getLockIncomingPayements() {
        return cy.iframe().find('mat-radio-button[id="Lock incoming payments"]')
    }
    getLockBothPayements() {
        return cy.iframe().find('mat-radio-button[id="Lock both"]')
    }
    getlockallbtn() {
        return cy.iframe().find('button[id="submit-lock"]')
    }
    getconfirmationlock() {
        return cy.iframe().find('#reason')
    }
    getconfirmationbtn() {
        return cy.iframe().find('button[id="submit-lock-unlock"]')
    }
    getcredentials() {
        return cy.iframe().find('#mat-tab-label-0-4')
    }
    getresetcredentials() {
        return cy.iframe().find('button[id="reset-credentials"]')
    }
    getresetconfirmation() {
        return cy.iframe().find('button[id="submit-reset"]')
    }
    getsuccessresetconfirmation() {
        return cy.iframe().find('button[id="success-reset"]')
    }
    getUnlockoutgoingPayements() {
        return cy.iframe().find('mat-radio-button[id="Unlock outgoing payments"]')
    }
    getunlockbtn() {
        return cy.iframe().find('button[id="submit-unlock"]')
    }
    getlockunclockWallets() {
        return cy.iframe().find('#lock-unlock')
    }
    getlockedmessage() {
        return cy.iframe().find('div .cdk-overlay-pane >snack-bar-container>simple-snack-bar>span')
    }
    getEyeIcon() {
        return cy.iframe().find('#view-all-details')
    }
    getSuspendUser() {
        return cy.iframe().find('#suspend-resume-user')
    }
    getreason() {
        return cy.iframe().find('#reason')
    }
    getReverYes() {
        return cy.iframe().find('#yes-reverse-transaction')
    }
    getreverseservicecharge() {
        return cy.iframe().find('#reverse-charge-tax-input')
    }
    getreversecommission() {
        return cy.iframe().find('#reverse-commission-tax-input')
    }
    getcomment() {
        return cy.iframe().find('#comment')
    }
    getreasonforclosure() {
        return cy.iframe().find('#reason-for-closure')
    }
    getintiatedelete() {
        return cy.iframe().find('#initiate-delete')
    }

    getsuccessresetconfirmation() {

        return cy.iframe().find('button[id="success-reset"]')

    }
    getDoneButton() {
        return cy.iframe().find('[data-test-id="done"]')
    }
    getComment() {
        return cy.iframe().find('input[id="comment"]')
    }
    getReason() {
        return cy.iframe().find('select[id="reason-for-closure"]')
    }
    getReason1() {
        return cy.iframe().find('select[id="reason-for-closure"]')
    }
    getDelete() {
        return cy.iframe().find('button[id="delete-user"]')

    }
    getDeleteButton() {
        return cy.iframe().find('button[id="initiate-delete"]')
    }
    getWalletPaymentHistoryButton() {
        return cy.iframe().find('[id="mat-tab-label-0-2"]')
    }
    getWalletExpandButton() {
        return cy.iframe().find('[id="view-more"]').eq(0)
    }
    getViewMoreDetailsButton() {
        return cy.iframe().find('[id="view-more-details"]')
    }
    getFilter() {
        return cy.iframe().find('.mat-button-wrapper > mat-icon[data-mat-icon-name="filter"]')
    }
    getFilterStatementButton() {
        return cy.iframe().find('[id="filter-statement"]')
    }
    getStatus() {
        return cy.iframe().find('[id="Success"]').eq(0)
    }
    getApplyFilterButton() {
        return cy.iframe().find('[id="apply-filter"]')
    }
    getSearchTransactionId() {
        return cy.iframe().find('input[id="search-transaction-id"]')
    }

    getDatePickerStart() {
        return cy.iframe().find('[id="startDate"]').eq(0)
    }
    getDatePickerEnd() {
        return cy.iframe().find('[id="endDate"]').eq(1)
    }

    getEndDate() {
        return cy.iframe().find('.btn-light.ng-star-inserted')
    }
    getStartDate() {
        return cy.iframe().find('.btn-light.ng-star-inserted')

    }
    getAssert() {
        return cy.iframe().find('.p-2:nth-child(1) div.col-md-4.mt-2.ng-star-inserted:nth-child(5) app-view-detail:nth-child(1) div:nth-child(1) p.decoration > span:nth-child(1)')
    }
    getexpandmore() {
        return cy.iframe().find('[data-test-id="more-tabs"]')
    }
    getwallet() {
        return cy.iframe().find('#wallet_payment_history')
    }

    getLatestTrasanction() {
        return cy.iframe().find('[id="mat-select-value-1"]')
    }

    getViewMoreDetailsButton() {
        return cy.iframe().find('[id="view-more-details"]')
    }

    getWalletExpandButton() {
        return cy.iframe().find('[id="view-more"]').eq(0)
    }

    getOrderDetailsButton() {
        return cy.iframe().find('[id="mat-tab-label-0-1"]')

    }

    getOrderDetailsMessage() {
        return cy.iframe().find('.container-fluid.mt-3')

    }

    getViewAllDetailsButton() {
        return cy.iframe().find('[id="view-all-details"]')
    }
    gettransactionId() {
        return cy.iframe().find('.mat-tooltip-trigger.auto-scroll.user-select-all.ng-star-inserted span')
    }
    getserachicon() {
        return cy.iframe().find('.cursor-pointer')
    }
    getTransactionId() {
        return cy.iframe().find('.mat-column-transaction-id.ng-star-inserted span span')
    }
    getreversetransaction() {
        return cy.iframe().find('img.mat-tooltip-trigger.transaction-icon')
    }
    getservice() {
        return cy.iframe().find('[data-test-id=EXTRASERVICES]')
    }
    getapply() {
        return cy.iframe().find('button[id="apply-filter"]')
    }
    getTransactionCorrection() {
        return cy.iframe().find('div.mat-autocomplete-panel .mat-option-text ')
    }
    getradiostatus() {
        return cy.iframe().find('.mat-radio-label-content')
    }
    getcheckbox1() {
        return cy.iframe().find('.filter-form-values')
    }
    getoptions() {
        return cy.iframe().find('.mat-autocomplete-panel')
    }
}
export default manageUsers