class Approval{

getFirstApproval(){
    return cy.iframe().find('.wwFormTableC .tabcol').eq(11)
   
}
getReject(){
    return cy.iframe().find('.wwFormTableC .tabcol').eq(12)
   
}
getSubmitbttn(){
    return cy.iframe().find('#trView_button_submit')
}

getsubmitbttnTransferrule(){

    return cy.iframe().find("#o2cApproval1_displayTransactionDetails_button_submit")

}
getTransferRule(){

    return cy.iframe().find('[name="confirm"] .wwFormTableC>tbody>tr','{force:true}').each(($row=>{

      cy.wrap($row).within(function(){

          cy.get('td').each(($el=>{

              cy.log($el.text())

              if($el.text()==this.data01.AddGrades.gradeCode){

                  cy.get('a').click()

              }

          }))
         })

  }))

}

getApprovalTransferrule(){

    return cy.iframe().find("#o2cApproval1_displayTransactionDetails_button_approve")

}
}
export default Approval