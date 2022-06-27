class SecurityProfilePage{

    getSecurityProfilePageTitle(){
        return cy.iframe().find('.text-secondary')
    }
    getAddProfile(){
        return cy.iframe().find('.mat-focus-indicator.comBtn.mat-raised-button.mat-button-base')
    }
    getEnterProfileName(){
        return cy.iframe().find('#profileName')
    }
    getMinPasswordLength(){
        return cy.iframe().find('#minPwdLength')
    } 
    getMaxPasswordLength(){
        return cy.iframe().find('#maxPwdLength')
    }
    getCheckBox(){
        return cy.iframe().find('.mat-checkbox-label')
    }
    getFailedPwdLoginCAPTCHA(){
        return cy.iframe().find('#failedPwdAttemptsForCaptcha')
    }
    getFailedPinLoginCAPTCHA(){
        return cy.iframe().find('#failedPinAttemptsForCaptcha').eq(0)
    }
    getFailedPasswordAttempts(){
        return cy.iframe().find('#failedPwdAttemptsForBlock')
    }
    getAllowedSplChar(){
        return cy.iframe().find('#allowedSpecialCharsForPwd')
    }
    getPasswordExpiry(){
        return cy.iframe().find('#pwdExpiryDays')
    }
    getLastNonRepeatingPWD(){
        return cy.iframe().find('#numberOfLastPwds')
    }
    getPIN(){
        return cy.iframe().find('.ng-star-inserted').contains('Pin')
    }
    getSequentialNumberCheckBox(){
        return cy.iframe().find('[for="allowSeqDigForPin-input"]')
    }
    getPinLength(){
        return cy.iframe().find('#pinLength')
    }
    getPinBlock(){
        return cy.iframe().find('#failedPinAttemptsForBlock')
    }
    
    getRepeatingNumberCheckBox(){
        return cy.iframe().find('#allowRepeatingDigForPin')
    }
    getPinExpiry(){
        return cy.iframe().find('#pinExpiryDays')
    }
    getNonRepeatingLastPins(){
        return cy.iframe().find('#noOfLastPins')
    }
    getTwoFactorAuth(){
        return cy.iframe().find('.ng-star-inserted').contains('Two Factor Authentication')
    }
    getEverytime(){
        return cy.iframe().find('.mat-checkbox-inner-container').eq(0)
    }
    getLoginRestrictions(){
        return cy.iframe().find('.ng-star-inserted').contains('Login')
    }
    getMultipleLoginsAllowedCount(){
        return cy.iframe().find('#multipleLoginsAllowedCount')
    }
    getSelectAllorClearLink(){
        return cy.iframe().find('.btn.btn-link.px-0').contains('Select All')
    }
    getIpRangeRadioButton(){
        return cy.iframe().find('.mat-radio-outer-circle').eq(2)
    }
    getIpRangeFrom(){
        return cy.iframe().find('#ipRangeFrom')
    }
    getIpRangeTo(){
        return cy.iframe().find('#ipRangeTo')
    }
    getAuthSystem(){
        return cy.iframe().find('#authSystem')
    }
    getCoolOffPeriod(){
        return cy.iframe().find('#coolOffPeriod')
    }
    getAutoLogoutTime(){
        return cy.iframe().find('#autoLogoutTime')
    }
    getNotifyOnDeviceChangeCheckBox(){
        return cy.iframe().find('.mat-checkbox-inner-container').eq(7)
    }
    getMinSecurityQuestionToResetCredentials(){
        return cy.iframe().find('#minSecurityQuestionToResetCredentials')
    }
    getMaxSecurityQuestionToResetCredentials(){
        return cy.iframe().find('#maxSecurityQuestionToResetCredentials')
    }
    getAddButton(){
        return cy.iframe().find('button.btn.btn-next.py-2.next-button.rounded-button.mr-8')
    }
    getFilterButton(){
        return cy.iframe().find('.mat-focus-indicator.mat-icon-button.mat-button-base.noFilter')
    }
    getDefaultCheckBox(){
        return cy.iframe().find('#mat-checkbox-23')
    }
    getApplyButton(){
        return cy.iframe().find('.mat-focus-indicator.mat-raised-button.mat-button-base').eq(2)
    }
    getShowDropDown(){
        return cy.iframe().find('#mat-select-value-7')
    }
    getSelectFromDropDown(){
        return cy.iframe().find('.mat-option-text').contains("20")
    }
    getCreatedBy(){
        return cy.iframe().find('.mat-cell.cdk-cell.cdk-column-createdBy.mat-column-createdBy.ng-star-inserted')
    }
    getSelectSubUserTypeTab()
    {
        return cy.iframe().find('#ngb-nav-0')
    }
    getUserRole(){
        return  cy.iframe().find('.mat-radio-label-content')
    }
    getSelectAdminUserTypeTab()
    {
        return cy.iframe().find('#ngb-nav-1')
    }      
    getSelectBusinessUserTypeTab()
    {
        return cy.iframe().find('#ngb-nav-2')
    }
    getFilter(){
        return cy.iframe().find('.mat-button-wrapper>.noFilter')
    }
    getDefaultCheckBox(){
        return cy.iframe().find('#mat-checkbox-1')
    }
    getApplyFilter(){
        return cy.iframe().find('.mat-focus-indicator.mat-raised-button.mat-button-base').eq(2)
    }
    getCategory(){
        return cy.iframe().find('.mat-cell.cdk-cell.cdk-column-CATEGORY.mat-column-CATEGORY.ng-star-inserted')
    }
    getConfirmButton(){
        return cy.iframe().find('.mat-button-wrapper').contains('CONFIRM')
    }
    getSuccessMessage(){
        return cy.iframe().find('.text-center.text-success')
    }
    getDoneButton(){
        return cy.iframe().find('.btn.btn-danger.done.mx-auto.next-button')
    }
    getSecurityProfiletitle(){
        return cy.iframe().find('[for="securityProfile"]')
    }
    getType(){
        return cy.iframe().find('.mat-cell.cdk-cell.cdk-column-profileType.mat-column-profileType.ng-star-inserted')
    }
    getIpAddress(){

        return cy.iframe().find('#ipGroup')
    }

    getProfileNameExist(){
        return cy.iframe().find('.textcolor.alert.alert-light.ng-star-inserted').contains
        ( 'Profile with same name already exists. Try another!')
    }
    getIpGroupRadioButton(){
        return cy.iframe().find('.font-weight-700.form-label.label-text').eq(0)
    }
    getGeoLocation(){

        return cy.iframe().find('.mat-checkbox-inner-container').eq(3)

    }
 
}
export default SecurityProfilePage 