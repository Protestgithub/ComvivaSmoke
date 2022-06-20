class myActivity{
    getFilter()
    {
        return cy.iframe().find('#filter')
    }
    getAddUser()
    {
        return cy.iframe().find('input[name="Add User"]')
    }
    getModificationOfUser()
    {
        return cy.iframe().find('[data-test-id="Modification Of User"]')
    }
    getSavedStatus()
    { 
        return cy.iframe().find('#Saved')
    }
    getRejectStatus()
    {
        return cy.iframe().find('#Rejected')
    }
    getSubmittedStatus()
    {
        return cy.iframe().find('#Submitted')
    }
    getIntermediateStatus()
    {
        return ccy.iframe().find('#Intermediate-input')
    }
    getApply()
    {
        return cy.iframe().find('#apply')
    }
    getExpandButton()
    {
        return cy.iframe().find('#expansion').eq(0)
    }
    getViewDetails()
    {
        return cy.iframe().find('#view-details')
    }
    getWithDraw()
    {
        return cy.iframe().find('#withdraw')
    }
    getResumeDetials()
    {
        return cy.iframe().find('#resume')
    }
    getResumeUser()
    {
        return cy.iframe().find('#resume-user')
    }
    getNextButton()
    {
        return cy.iframe().find('#next')
    }
    getSubmitButton()
    {
        return cy.iframe().find('#submit')
    }
    getYesButton()
    {
        return cy.iframe().find('#yes')
    }

}
export default myActivity