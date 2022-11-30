class API{
getOTPicon(){
    return cy.iframe().find('[id="generate-otp-icon"]')
}
getOTPDailogbox(){
    return cy.iframe().find('input[id*=otp_]')
}
getVerifybttn(){
    return cy.iframe().find('.mat-verify-button')
}
getOTPDailogbox1(){
    return cy.iframe().find('.otpInput')
}
getVerifybttn1(){
    return cy.iframe().find('.verify-btn')
}
}
export default API

