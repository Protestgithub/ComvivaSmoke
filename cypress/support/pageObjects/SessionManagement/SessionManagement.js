
class SessionManagement
{
    getSearchUser(){
        return cy.iframe().find('input[data-test-id="user-search-details"]')
    }
    getSearchBtn(){
        return cy.iframe().find('#session-search')
    }
    getimg(){
        return cy.iframe().find('.valid-user img')
    }
    getdevices()
    {
        return cy.iframe().find('mat-checkbox[class="mat-checkbox mat-accent"]')
    }
    getdeletedevices()
    {
        return cy.iframe().find('button[id="delete-action"]')
    }
    getconfirmdelete()
    {
        return cy.iframe().find('button[id="delete-selected"]')
    }
}
export default SessionManagement