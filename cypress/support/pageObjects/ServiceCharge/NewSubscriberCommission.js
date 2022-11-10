class NewSubscriberCommission
{
   getSubscriberCommissionRuleName(){
    return cy.iframe().find('input[name="commRuleName"]')
   }

   getCount()
   {
    return cy.iframe().find('[id="profileName"]')
   }

    getValidity(){
    return cy.iframe().find('[id="shortCode"]')
   }

   getCheckAll(){
    return cy.iframe().find('[onclick="javascript:selectAll()"]')
   }

   getSaveButton(){
    return cy.iframe().find('[name="action:addSubsComRule_confirmAddSubsCommRule"]')
   }
}
export default NewSubscriberCommission
