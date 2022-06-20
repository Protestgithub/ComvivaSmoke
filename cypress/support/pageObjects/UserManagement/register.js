class register {

    getregisterPageTitle(){

        return cy.iframe().find('h4[class="text-secondary"]')
    }

    checkSelectedTabHighlighted()
    {
        return cy.iframe().find('.nav-link.py-3.registration-header.active-link.hover-text-white')
    }

    getSelectSubUserTypeTab()
    {
        return cy.iframe().find('a[name="type-Subscriber"]')
    }

    getSelectUserTypeTab()
    {
        return cy.iframe().find('a[role="tab"]')
    }

    getUserRole(){
        return  cy.iframe().find('.mat-radio-label-content')
    }
    getRegistrationMode()
    {
        return cy.iframe().find('.mat-button-focus-overlay')
    }
    getFirstName()
    {
        return cy.iframe().find('input[id="firstName"]')
    }
    getLastName(){
        return cy.iframe().find('input[id="lastName"]')
    }
    getPreferredLanguage()
    {
        cy.iframe().find('#preferredLanguage')
    }
    getLoginID(){
        return cy.iframe().find('input[id="loginId"]')
    }
    getEmailID(){
        return cy.iframe().find('input[id="emailId"]')
    }
    getMobileNumber(){
        return cy.iframe().find('input[id="mobileNumber"]')
    }
    getAdressLine1(){
        return cy.iframe().find('#address1')
    }

    getAdressLine1(){
        return cy.iframe().find('#address1')
    }

    getState(){
        return cy.iframe().find('select[id="state"]')
    }

    getCity(){
        return cy.iframe().find('select[id="city"]')
    }

    getCountry(){
        return cy.iframe().find('select[id="country"]',"{force:true}")
    }
    getCountry1(){
        return cy.iframe().find('select[id="country"]> option',"{force:true}")
    }

    getState(){
        return cy.iframe().find('select[id="state"]')
    }
    getCity(){
        return cy.iframe().find('select[id="city"]')
    }
    getNextButtonBasic(){
        return cy.iframe().find('[id="next"]').eq(0)
    }
    getKycDropDownButton(){
        return cy.iframe().find('[class="ng-fa-icon"]')
    }
    getKycIDType(){
        return cy.iframe().find('#kycIdType')
    }
    getKycIDValue(){
        return cy.iframe().find('#kycIdValue')
    }
    getKycGracePeriod(){
        return cy.iframe().find('#kycGracePeriod').eq(0)
    }
    getKycTab(){
        return cy.iframe().find('.mat-step-text-label.ng-star-inserted').contains('KYC')
    }
    getMakeThisPrimaryButton(){
        return cy.iframe().find('[class="slider round"]')
    }
    getNextButtonKYC(){
        return cy.iframe().find('[id="next"]')
    }
    getNextButtonProfile(){
        return cy.iframe().find('[id="next"]').eq(1)
    }
    getKYCButton(){
        return cy.iframe().find('[class="ng-fa-icon"]')
    }
    getKYCIDType(){
        return cy.iframe().find('#kycIdType')
    }
    getKYCIDValue(){
        return cy.iframe().find('#kycIdValue')
    }
    getKYCGracePeriod(){
        return cy.iframe().find('#kycGracePeriod')
    }
    getNextButtonBasic1(){
        return cy.iframe().find('button[data-test-id="next"]').eq(1)
    }
    getMakeThisPrimaryButton(){
        return cy.iframe().find('[class="slider round"]')
    }
      getSecurityProfile()
    {
        return cy.iframe().find('#securityProfile',{force:true})
    }
    getSecurityProfile1()
    {
        return cy.iframe().find('#securityProfile> option',{force:true})
    }

    getAuthProfile(){
        return cy.iframe().find('select[id="authProfile"]')
    }
    getReguProfile(){
        return cy.iframe().find('#regulatoryProfile')
    }

    getMarketingProfile(){
        return cy.iframe().find('#marketingProfile')
    }

    getMarkProfile()
    {
        return cy.iframe().find('#marketingProfile')
    }
    getSaveButton()
    {
        return cy.iframe().find('#save')
    }
    getNextButtonBasic2(){
        return cy.iframe().find('button[data-test-id="next"]').eq(2)
    }
    getNextButtonBasic3(){
        return cy.iframe().find('button[data-test-id="next"]').eq(3)

    }

    getSubmitButton()
    {
        return cy.iframe().find('#submit')
    }

    getConfirmationText()
    {
        return cy.iframe().find('.text-center').should('have.text',' SUCCESS User registration is successfully initiated. Kindly contact admin for approval')
    }
    getConfirmationText1()
    {
        return cy.iframe().find('.text-center')
    }
    getDoneButton(){
        return cy.iframe().find('button[id="done"]')
    }
   
    getAddMoreButton(){
        return cy.iframe().find('#kyc-add-more')
    }

    getConfirmButton(){
        return cy.iframe().find('#confirm')
    }
    getSupportOnline()
    {
        return cy.iframe().find('#isTransferReversalRequired')
    }
    getLatitude()
    {
        return cy.iframe().find('#latitude')
    }

    getlongitude()
  {
    return cy.iframe().find('#longitude')
  }
  getParent()
    {
        return cy.iframe().find('#parentId')
    }
    getGo()
    {
        return cy.iframe().find('#go')
    }

   getRadioButton()
   {
       return cy.iframe().find('input.form-check-input.mx-0')
   }

    getErrorMessage()
    {
        return cy.iframe().find('.ng-star-inserted [class="text-danger ng-star-inserted"]').eq(0)
    }
    getMakeThisPrimary()
    {
        return cy.iframe().find('.switch #isPrimaryKYCId')
    }

    getTitle(){
        return cy.iframe().find('#title')
    }
   getRegulatory(){
       return cy.iframe().find('#regulatoryProfile')
   }
   getMarketing(){
       return cy.iframe().find('#marketingProfile')
   }
   getSMSC(){
       return cy.iframe().find('#smscId')
   }
   getTopUpId(){
       return cy.iframe().find('#topupId')
   }
   getRechargingOpt(){
       return cy.iframe().find('#rechargingOptions')
   }
   getVouchers(){
       return cy.iframe().find('#vouchers')
   }
   getNextButtonOperatorProfile(){
    return cy.iframe().find('button[data-test-id="next"]').eq(2)
}
getDenominationOptional(){
    return cy.iframe().find('#denominationSeries')
}

getKYCButton(){
    return cy.iframe().find('[class="ng-fa-icon"]')
}
getKYCIDType(){
    return cy.iframe().find('#kycIdType')
}
getKYCIDValue(){
    return cy.iframe().find('#kycIdValue')
}
getKYCGracePeriod(){
    return cy.iframe().find('#kycGracePeriod')
}
getNextButtonBasic1(){
    return cy.iframe().find('button[data-test-id="next"]').eq(1)
}
getMakeThisPrimaryButton(){
    return cy.iframe().find('[class="slider round"]')
}
  getSecurityProfile()
{
    return cy.iframe().find('select[id="securityProfile"]')
}
getAuthProfile(){
    return cy.iframe().find('select[id="authProfile"]')
}
getReguProfile(){
    return cy.iframe().find('#regulatoryProfile')
}
getPrimary(){
    return cy.iframe().find('.switch #isPrimaryKYCId')
}
getKYCIcon(){
    return cy.iframe().find('[class="mat-ripple mat-step-header-ripple"]')
}
getErrorIcon(){
    return cy.iframe().find('#generate-otp-icon')
}
getLoginError()
{
    return cy.iframe().find('div.ng-star-inserted')
}
getErrorIcon(){
    return cy.iframe().find('#generate-otp-icon')
}
getInvalidInputMessage(){
    return cy.iframe().find('.text-danger.ng-star-inserted')
}
//getValueIsNotUnique(){
  //  return cy.iframe().find('.text-danger').contains(' Value is not unique ')
//}
getErrorIcon(){
    return cy.iframe().find('#generate-otp-icon')
}

getLoginError()
{
    return cy.iframe().find('div.ng-star-inserted')
}

getuniqueness(){
    return cy.iframe().
    find('app-input-with-otp > .ng-star-inserted > div > .text-danger').contains
    ('Value is not unique').should('be.visible')
}
getInvalidInputMessage(){
    return cy.iframe().find('.text-danger.ng-star-inserted')
}
getValueIsNotUnique(){
    return cy.iframe().
    find('app-input-with-otp > .ng-star-inserted > div > .text-danger')
}
getErrorMaxKycReached(){
    return cy.iframe().find('.text-center').eq(1).contains('Maximum accounts for the primary kyc reached')
}

}
export default register