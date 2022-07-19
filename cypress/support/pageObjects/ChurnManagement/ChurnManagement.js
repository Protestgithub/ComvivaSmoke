class ChurnManagement {
    getCBatchApprove() {
        return cy.iframe().find('[id="approvalTypeCHURN_APPR"]')    }
    
    getChurnManagement() {
        return cy.get('[data-testid="menu.churnmgmt"]')
    }
    getChurnInitiation() {
        return cy.get('[data-testid="menu.churnmgmt"]').find('[title="Churn Initiation"]')
    }
    getChurnApproval() {
        return cy.get('[data-testid="menu.churnmgmt"]').find('[title="Churn Approval"]')
    }
    getDownloadFileTemplate() {
        return cy.iframe().find('a[href*="javaScript:openSheet()"]')
    }
    getChurnInitiationUpload() {
        return cy.iframe().find('input[id="uplFile"]')
    }
    getChurnInitiationUploadSubmit() {
        return cy.iframe().find('[id="submitButton"]')
    }
    getCBatchReject() {
        return cy.iframe().find('[id="approvalTypeCHURN_REJE"]')
    }
    getCBatchApproveRejectBySelection() {
        return cy.iframe().find('[id="approvalTypeCHURN_BOTH"]')
    }
    getChurnApprovalSubmitButton() {
        return cy.iframe().find('[id="appchurn"]')
    }
    getLastRadioButton()
    {
        return cy.iframe().find('[id="approvedBatchId"]').last()
    }
    getCheckAll()
    {
        return cy.iframe().find('input[type="checkbox"][id="checkall"]')
    }
    getApprove()
    {
        return cy.iframe().find('[id="approve"]')  
    }
    getChurnInitiationMessage()
    {
        return cy.iframe().find('.actionMessage')
    }
getRecentDatainchurn(){
return cy.iframe().find('#approvalForm>.wwFormTableC>tbody>tr',{force:true}).within(function(){
cy.wait(2000)
	cy.get("td").within(function(){
 	cy.get('input[id="approvedBatchId"]').last().click({force:true})
		})
	})
}


}
export default ChurnManagement