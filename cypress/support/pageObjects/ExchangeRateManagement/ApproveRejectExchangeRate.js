class ApproveRejectExchangeRate
{
    getapproveER()
    {
        return cy.iframe().find('#approve0')
    }
    getrejectER()
    {
        return cy.iframe().find('#reject0')
    }
    getapproveDER()
    {
        return cy.iframe().find('div:nth-child(4) ul:nth-child(1) li:nth-child(1) > span.actionMessage')
    }
}
export default ApproveRejectExchangeRate