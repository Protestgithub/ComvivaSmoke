class UpdatedApproveRejectExchangeRate
{
    getUpdatedapproveER()
    {
        return cy.iframe().find('#approve0')
    }
    getUpdatedrejectER()
    {
        return cy.iframe().find('#reject0')
    }

}
export default UpdatedApproveRejectExchangeRate
