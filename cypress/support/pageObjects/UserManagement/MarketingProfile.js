class MarketingProfile {
    getAddMarketingProfile() {
        return cy.iframe().find('button[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSizeSmall MuiButton-sizeSmall"]')



    }
    getEditMArketingProfile() {



        return cy.iframe().find('.MuiTableCell-root.MuiTableCell-body.tableCell.MuiTableCell-alignLeft:nth-child(5) svg.MuiSvgIcon-root').eq(0)



    }



    getsave() {



        return cy.iframe().find('button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.jss38.MuiButton-contained > span.MuiButton-label')



    }
    getMarketingProfileCode() {
        return cy.iframe().find('input[name="marketingProfileCode"]')
    }
    getMarketingProfileName() {
        return cy.iframe().find('input[name="marketingProfileName"]')
    }
    getMarketingProfileDomainName() {
        return cy.iframe().find('#mui-component-select-domain')
    }
    getMarketingProfileDomainName1() {
        return cy.iframe().find('div .MuiList-root.MuiMenu-list.MuiList-padding [data-value="SUBS"]')
    }
    getMarketingProfileCategoryName() {
        return cy.iframe().find('#mui-component-select-category')
    }
    getMarketingProfileCategoryName1() {
        return cy.iframe().find('div .MuiList-root.MuiMenu-list.MuiList-padding [data-value="SUBS"]')
    }
    getMarketingProfileMFSProvider() {
        return cy.iframe().find('[id="mui-component-select-marketingProfileDetails[0].mfsProvider"]')
    }
    getMarketingProfileMFSProvider1() {
        return cy.iframe().find('div .MuiList-root.MuiMenu-list.MuiList-padding [data-value="101"]')
    }
    getMarketingProfileWalletType() {
        return cy.iframe().find('[id="mui-component-select-marketingProfileDetails[0].walletType"]')
    }
    getMarketingProfileWalletType1() {
        return cy.iframe().find('div .MuiList-root.MuiMenu-list.MuiList-padding [data-value="11"]')
    }
    getMarketingProfileGrade() {
        return cy.iframe().find('[id="mui-component-select-marketingProfileDetails[0].gradeCode"]')
    }
    getMarketingProfileGrade1() {
        return cy.iframe().find('div .MuiList-root.MuiMenu-list.MuiList-padding [data-value="SUBS"]')
    }
    getMarketingProfileInstrumentTCP() {
        return cy.iframe().find('[id="mui-component-select-marketingProfileDetails[0].instrumentLevelTCP"]')
    }
    getMarketingProfileInstrumentTCP1() {
        return cy.iframe().find('div .MuiList-root.MuiMenu-list.MuiList-padding [data-value="TCP2106041757.043443"]')
    }
    getMarketingProfileAddBtn() {
        return cy.iframe().find('button[class="MuiButtonBase-root MuiButton-root MuiButton-contained jss38 MuiButton-contained"]')
    }
    getSearchProfilecode() {
        return cy.iframe().find('input[id="profileCode"]')
    }
    getsearchbtn() {
        return cy.iframe().find('button[id="search-btn"]')
    }
    getMarketingProfileWalletType2() {



        return cy.iframe().find('div .MuiList-root.MuiMenu-list.MuiList-padding [data-value="12"]')



    }



    getMarketingProfileGrade2() {



        return cy.iframe().find('div .MuiList-root.MuiMenu-list.MuiList-padding [data-value="GRT"]')



    }



    getMarketingProfileInstrumentTCP2() {



        return cy.iframe().find('div .MuiList-root.MuiMenu-list.MuiList-padding')



    }
}
export default MarketingProfile