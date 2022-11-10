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
getChurnInitiationMessage1() {
return cy.iframe().find('span.actionMessage')
}
//----------------------------------------- Cas in -----------------------------------

getMSISDN(){
    return cy.iframe().find('#paymentMethodNumberId')
}

getProvider(){
    return cy.iframe().find('#partyProviderListSel')
}
getMSISDN(){
    return cy.iframe().find('#partyWalletListSel')
}
getAmount(){
    return cy.iframe().find('[name="amount"]')
}
getPaymentID(){
    return cy.iframe().find('[name="referenceNumber"]')
}
getSubmitButton(){
    return cy.iframe().find('#selectForm_button_submit')
}
getConfirmButton(){
    return cy.iframe().find('#cashButt')
}
}



export default ChurnManagement