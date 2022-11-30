import { eq } from "lodash"

class approvals {

    getFilter() {
        return cy.iframe().find('.mat-button-wrapper > mat-icon[data-mat-icon-name="filter"]')
    }
    getAddUserCheckBox() {
        return cy.iframe().find('span.mat-checkbox-label').eq(1)
    }

    getSubmittedCheckBox() {
        return cy.iframe().find('span.mat-checkbox-label').eq(5)
    }
    getModificationUserCheckBox() {
        return cy.iframe().find('span.mat-checkbox-label').eq(2)
    }
    getApplyFilter() {
        return cy.iframe().find('button[id="apply-filter"]')
    }
    getCreatedOnTime() {
        return cy.iframe().find('[class="mat-cell cdk-cell cdk-column-createdOn mat-column-createdOn ng-star-inserted"]')
    }    
    
    getCurrentDateRowData() {
        const dayjs = require("dayjs")
        return cy.iframe().find('mat-cell[role="gridcell"]') ///.contains(dayjs().format('DD/MM/YYYY'))
    }
    getApproveButton() {
        return cy.iframe().find('button[id="approve-expanded-record"]')
    }
    getRejectButton() {
        return cy.iframe().find('button[data-test-id="reject-expanded-record"]').eq(0)
    }
    getUserID() {
        return cy.iframe().find('.label-text.ng-star-inserted')
    }
    getApproveRequest() {
        return cy.iframe().find('.mat-dialog-actions > button.mat-focus-indicator.btn-rounded.button-primary')
    }
    getRejectComment() {
        return cy.iframe().find('#rejection-comment')
    }
    getRejectRequest() {
        return cy.iframe().find('button[type="button"]')
    }

    getApproveConfirmationMessage() {
        return cy.iframe().find('.mat-simple-snackbar.ng-star-inserted > span')
    }
    getSuccessMessage() {
        return cy.iframe().find('.text-center.text-success')
    }
    getUpload() {
        return cy.iframe().find('#upload')
    }
    getClickHere() {
        return cy.iframe().find('.click-here')
    }
    getUploadDocument() {
        return cy.iframe().find('#upload-document')
    }
}
export default approvals