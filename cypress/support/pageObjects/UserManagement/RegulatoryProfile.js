class RegulatoryProfile
{
    getaddregulatoryprofile()
    {
        return cy.iframe().find('button[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSizeSmall MuiButton-sizeSmall"]')
    }
    getregulatoryprofilecode()
    {
        return cy.iframe().find('input[name="regulatoryProfileCode"]')
    }
    getregulatoryprofilename()
    {
        return cy.iframe().find('input[name="regulatoryProfileName"]')
    }
    getregulatorysavebtn()
    {
        return cy.iframe().find('button[class="MuiButtonBase-root MuiButton-root MuiButton-contained jss31 MuiButton-contained"]')
    }
    getmodifyregulatoryprofile()
    {
        return cy.iframe().find('svg[class="MuiSvgIcon-root"]')
    }
    getmodifyregulatoryprofilesavebtn()
    {
        return cy.iframe().find('button[class="MuiButtonBase-root MuiButton-root MuiButton-contained jss31 MuiButton-contained"]')
    }
    getRPSearchProfileCode()
    {
        return cy.iframe().find('input[id="profileCode"]')
    }
    getRPSearchProfileName()
    {
        return cy.iframe().find('input[id="profileName"]')
    }
    getRegulatoryProfileSearchbtn()
    {
        return cy.iframe().find('button[id="search-btn"]')
    }
    getrpsuccess()
    {
        return cy.iframe().find('div div .MuiSnackbarContent-message')
    }

}
export default RegulatoryProfile