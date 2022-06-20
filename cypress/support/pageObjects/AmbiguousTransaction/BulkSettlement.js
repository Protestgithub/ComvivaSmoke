class BulkSettlement{
    getOperatorName(){
        return cy.iframe().find('.browser-default.ng-untouched.ng-pristine.ng-valid')
    }
  getDownloadTemplate(){
      return cy.iframe().find('.download_template')
  }
  getRemarks(){
      return cy.iframe().find('#remarks')
  }
  getUploadfile(){
    return cy.iframe().find('input[type="file"]')
    //  return cy.iframe().find('.center div div label')
  }
  getSubmitbttn(){
      return cy.iframe().find('.btn.waves-effect.waves-light.submitBtn')
  }
}

export default BulkSettlement