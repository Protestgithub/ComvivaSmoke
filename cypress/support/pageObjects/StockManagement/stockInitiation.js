class stockInitiation{
    getProvider()
    {
        return cy.iframe().find('select[id="mfsProvidersList"]')
    }
    getProvider1()
    {
        return cy.iframe().find('select[id="mfsProvidersList"]> option')
    }
    getStockFrom()
    {
        return cy.iframe().find('#bankId')
    }
    getReferenceNumber()
    {
        return cy.iframe().find('input[name="_refNo"]')
    }
    getRequestedAmount()
    {
        return cy.iframe().find('input[name="_requestedQuantity"]')
    }
    getSubmitButton() 
    {
        return cy.iframe().find('input[id="stockInit_confirmInitiate_button_submit"]')
    }
    getConfirmButton()
    {
        return cy.iframe().find('input[id="stockButt"]')
    }
    getSubmitButton_1()
    {
        return cy.iframe().find('input[id="stockApprove1_approve_button_submit"]')
    }
    getSubmitButton_2()
    {
        return cy.iframe().find('#stockApprove2_approve_button_submit')
    }
    getApproveButton_1()
    {
        return cy.iframe().find('input[id="stockApprove1_confirmApproval_button_approve"]')
    }
    getApproveButton_2()
    {
        return cy.iframe().find('#stockApprove2_confirmApproval_button_approve')
    }
    getSuccessMsg()
    {
    return cy.iframe().find('.actionMessage')
    }

    getBalance()
    {
    return cy.iframe().find('.wwFormTableC>tbody>tr:nth-child(4)>.tabcol')
    }

//--------------------------------------------------------------------------------------------


getApprovalLimit1()
{
return cy.iframe().find('#StockApprovalTransferLimitAction_insertApprovalLimit_approvalLimit1')
}

getsubmitbutton()
{
return cy.iframe().find('[name="button.submit"]')
}


}

export default stockInitiation