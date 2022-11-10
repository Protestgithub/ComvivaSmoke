class AddExchangeRateManagement{
    getiframeERM()
    {
        return cy.frameLoaded('[class=" svelte-vthf9s"] div iframe')
    }
    getbasecurrency()
    {
        return cy.iframe().find('select[id="overlaySvc_addNewExchangeRate_selectedBaseCurrency"]')
    }
    gettargetcurrency()
    {
        return cy.iframe().find('select[id="overlaySvc_addNewExchangeRate_selectedTargetCurrency"]')
    }
    getvalidfrom()
    {
        return cy.iframe().find('input[name="dojo.validFrom"]')
    }
    getvalidTo()
    {
        return cy.iframe().find('.wwFormTableC > tbody > tr > :nth-child(2) > [id="ValidTo"] > img')
    }
    getvalidFrom()
    {
        return cy.iframe().find('.wwFormTableC > tbody > tr > :nth-child(2) > [id="validFrom"] > img')
    }
    getnextyear()
    {
        return cy.iframe().find('[dojoattachpoint="nextYearLabelNode"]').eq(1)
    }
    getnextmonth()
    {
        return cy.iframe().find('[dojoattachpoint="increaseMonthNode"]').eq(1)
    }
    getdates()
    {
        return cy.iframe().find('.calendarBodyContainer > [dojoattachpoint="calendarDatesContainerNode"] > :nth-child(4) > td').eq(8)
    }
    getForexRate()
    {
        return cy.iframe().find('#overlaySvc_addNewExchangeRate_forexRate')
    }
    getsubmitbtn()
    {
        return cy.iframe().find('input[id="overlaySvc_addNewExchangeRate_button_submit"]')
    }
    getExchangeRatecreated()
    {
        return cy.iframe().find('div .actionMessage')
    }
   getError()
    {
        return cy.iframe().find('div .errorMessage')
    } 
    getlogout()
    {
        return cy.get('[data-top="203.1979217529297"]')
    }
}
export default AddExchangeRateManagement