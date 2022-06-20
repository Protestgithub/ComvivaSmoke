class walletManagement{
    getMultipleWalletManagement()
    {
        return cy.get('a[title="Multiple Wallet Management"]')
    }
    getAddWallet()
    {
        return cy.get('a[title="Add Wallet"]')
    }
    getErrorMessage()
    {
        return cy.iframe().find('.errorMessage')
    }
    getDeleteWallet()
    {
        return cy.get('a[title="Delete Wallet"]')
    }
    getViewWallet()
    {
        return cy.get('a[title="View Wallet"]')
    }
    getModifyWallet()
    {
        return cy.get('a[title="Modify Wallet"]')
    }
    getWalletName()
    {
        return cy.iframe().find('input[name="walletName"]')
    }
    getSaveButton()
    {
        return cy.iframe().find('input[name="button.save"]')
    }
    getDeleteButton()
    {
        return cy.iframe().find('action:multipleWalletMgmtDelete_detailsOfSelectedWallet')
    }
    getConfirmDelete()
    {
        return cy.iframe().find('input[name="action:multipleWalletMgmtDelete_deleteWallet"]')
    }
    getUpdateButton()
    {
        return cy.iframe().find('input[name="action:multipleWalletMgmtModify_detailsOfSelectedWallet"]')
    }
    getSaveWallet()
    {
        return cy.iframe().find('input[name="action:multipleWalletMgmtModify_modifyWallet"]')
    }
    getDeleteRecord(){
        return cy.iframe().find('#deleteGrades_delete .wwFormTableC>tbody>tr','{force:true}').each(($row=>{
          cy.wrap($row).within(function(){
              cy.get('td').each(($el=>{
                  if($el.text()==this.data01.AddGrades.gradeCode){
                      cy.get('[type="checkbox"]').click()
                  }
                 
              }))
             
         
             })
      }))
      }
  /*  get()
    {
        return cy.iframe().find('')
    }
    get()
    {
        return cy.iframe().find('')
    }*/


}
export default walletManagement