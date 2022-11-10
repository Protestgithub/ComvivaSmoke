class UpdateExchangeRate
{
    getupdatedbasecurrency()
    {
        return cy.iframe().find('select[id="overlaySvc_updateExchangeRate_selectedBaseCurrency"]')
    }
    getupdatedtargetcurrency()
    {
        return cy.iframe().find('select[id="overlaySvc_updateExchangeRate_selectedTargetCurrency"]')
    }
    getupdatedvalidfrom()
    {
        return cy.iframe().find('input[name="dojo.validFrom"]')
    }
    getupdatedvalidto()
    {
        return cy.iframe().find('.wwFormTableC tbody>tr:nth-child(5)')
    }
    getupdatedforexrate()
    {
        return cy.iframe().find('#overlaySvc_updateExchangeRate_forexRate')
    }
    getupdatebutton()
    {
        return cy.iframe().find('#overlaySvc_updateExchangeRate_button_submit')
    }
    getUpdateError()
    {
        return cy.iframe().find('div .errorMessage')
    } 

}
export default UpdateExchangeRate