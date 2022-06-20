class TransferRulePage{

  getiframeTransferpage(){
      return cy.frameLoaded('[class=" svelte-vthf9s"] div iframe')

  }
  
  getServiceName(){
     return cy.iframe().find('select[id="serviceTypeId"]')
   
  }
  getFromMFSProvider(){
    return cy.iframe().find('select[id="payerProviderId"]')
  }
  getFromeDomain(){
    return cy.iframe().find('select[id="payerDomainCode"]')
  }
  getFromPaymentInstrument(){
    return cy.iframe().find('select[id="payerPaymentInstrumentId"]')
  }
  getFromWallettype(){
    return cy.iframe().find('select[id="payerLinkedWalletBankId"]')

}

 getToMFSProvider(){
  return cy.iframe().find('select[id="payeeProviderId"]')
}
getToDomain(){
  return cy.iframe().find('select[id="payeeDomainCode"]')
}
getToPaymentInstrument(){
  return cy.iframe().find('select[id="payeePaymentInstrumentId"]')
}
getToWallettype(){
  return cy.iframe().find('select[id="payeeLinkedWalletBankId"]')
}
getSubmitbttn(){
  return cy.iframe().find('input[id="selectForm_button_submit"]')
}
/*--------------------------------*/

getFromCategory(){
  return cy.iframe().find('select[id="payerCategoryCode"]')

}
getToCategory(){
  return cy.iframe().find('select[id="payeeCategoryCode"]')
}
getAddToTransferbttn(){
  return cy.iframe().find('input[id="trList_transferRuleAddChecks_trfrules_label_addtrfrule"]')
}
getFromGrade(){
  return cy.iframe().find('select[id="payerGradeCode"]')
}
getToGrade(){
  return cy.iframe().find('select[id="payeeGradeCode"]')
}
/*--------------------------------*/


getStatus(){
  return cy.iframe().find('select[id="trRule_confirmCoU_statusId"]')
}
getTransferType(){
  return cy.iframe().find('select[id="trRule_confirmCoU_transferType"]')
}

getGeographicalDomain(){
  return cy.iframe().find('select[id="trRule_confirmCoU_grphDomainCode"]')
}

getSubmitbttn2(){
  return cy.iframe().find('input[id="trRule_confirmCoU_button_submit"]')
}

/*----------------------*/

getConfirmbttn(){
  return cy.iframe().find('input[id="trView_buttonTR"]')
}

getEditOption(){
  return cy.iframe().find('td[class="tabcol"]').eq(26)
}
getViewOption(){
  return cy.iframe().find('td[class="tabcol"]').eq(25)
}
getBackbttn(){
  return cy.iframe().find(".tabcenter input[id='trView_button_back']")
}
getDeleteoption(){
  return cy.iframe().find('td[class="tabcol"]').eq(27)
  
}
getErrorMessage(){
  return cy.iframe().find(".errorMessage")
}
}
export default TransferRulePage

