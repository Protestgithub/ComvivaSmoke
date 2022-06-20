class Approval{

getFirstApproval(){
    return cy.iframe().find('.wwFormTableC .tabcol').eq(11)
   
}
getSubmitbttn(){
    return cy.iframe().find('#trView_button_submit')
}

getsubmitbttnTransferrule(){

    return cy.iframe().find("#o2cApproval1_displayTransactionDetails_button_submit")

}
getApprovalTransferrule(){

    return cy.iframe().find("#o2cApproval1_displayTransactionDetails_button_approve")

}
}
export default Approval