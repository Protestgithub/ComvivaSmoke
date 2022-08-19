//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import BankingActivation from '../support/pageObjects/BankingActivation';
import API from './pageObjects/API';

//----------------Object Declaration----------------------------------------------------------
const bankingActivationPage = new BankingActivation()
var SubscriberMsg = 'cypress/fixtures/userData/subscriberMsg.json'
const APIPage = new API()

//------------------------------------------------------------------------------------------------------
Cypress.Commands.add('getMobBankingActivationMessage', (apiURL) => {
    cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('getmessage')
    bankingActivationPage.getConfirmButton().contains('Confirm').click({force:true})
    cy.wait(2000)
    bankingActivationPage.getConfirmButton().contains('Done').click({force:true})
    cy.wait(2000)
    //approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.editUser)

    //  cy.iframe().find('[id="generate-otp-icon"]').eq(0).click()
    cy.wait('@getmessage').then((interception) => {
        let response = interception.response.body
        const resValues = Object.values(response)
        let serviceRequestID = resValues[3]
        cy.log(serviceRequestID)
        let url1 = apiURL + '/notify/internal/getByMessageIdOrExternalIdAndByToWhom?messageId='
        let url2 = url1.concat(serviceRequestID)
        let url3 = url2.concat('&toWhom=')

        cy.fixture('userData/subscriberReg.json').then((data) => {
            SubMobile = data.subscriberMobile
            cy.log(SubMobile)
        })
        let getURL = url3.concat('971'+SubMobile)

        cy.request({
            url: getURL,
            headers: {
                'Authorization': 'Basic YWRtaW46c2VjcmV0',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            let res1 = res.body
            cy.readFile(SubscriberMsg)
            cy.writeFile(SubscriberMsg, { MobBankingActivationMessage: res1 })
        })
    })
})


Cypress.Commands.add('getInternetBankingActivationMessage', (apiURL) => {
    cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('getmessage')
    bankingActivationPage.getConfirmButton().contains('Confirm').click({force:true})
    cy.wait(2000)
    bankingActivationPage.getConfirmButton().contains('Done').click({force:true})
    cy.wait(2000)
    //approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.editUser)

    //  cy.iframe().find('[id="generate-otp-icon"]').eq(0).click()
    cy.wait('@getmessage').then((interception) => {
        let response = interception.response.body
        const resValues = Object.values(response)
        let serviceRequestID = resValues[3]
        cy.log(serviceRequestID)
        let url1 = apiURL + '/notify/internal/getByMessageIdOrExternalIdAndByToWhom?messageId='
        let url2 = url1.concat(serviceRequestID)
        let url3 = url2.concat('&toWhom=')

        cy.fixture('userData/subscriberReg.json').then((data) => {
            SubMobile = data.subscriberMobile
            cy.log(SubMobile)
        })
        let getURL = url3.concat('971'+SubMobile)

        cy.request({
            url: getURL,
            headers: {
                'Authorization': 'Basic YWRtaW46c2VjcmV0',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            let res1 = res.body
            cy.readFile(SubscriberMsg)
            cy.writeFile(SubscriberMsg, { InternetBankingActivationMessage: res1 })
        })
    })
})


Cypress.Commands.add('OTP1',(apiURL) => {

    cy.intercept('/admin/activate-banking-cif/new-user/initiate').as('getOTP')
    bankingActivationPage.getNextBtn2().click({ force: true })
    cy.wait('@getOTP').then((interception) => {
        let response = interception.response.body
        const resValues = Object.values(response)
        const serviceRequestID = resValues[3]
        cy.log(serviceRequestID)
    let url1 = apiURL + '/otpservice/internal/genotp/'
        let getURL = url1.concat(serviceRequestID)
        cy.request({
            url: getURL,
            headers: {
                'Authorization': 'Basic YWRtaW46c2VjcmV0',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            let res1 = res.body
            const res3 = Object.values(res1)
            let OTP = res3[4]
            var OTPArr = Array.from({ length: 6 }, (v, k) => k + 1)
            cy.wrap(OTPArr).each((index) => {
                APIPage.getOTPDailogbox().eq(index - 1).type(OTP[index - 1])
            })
            bankingActivationPage.getConfirmButton().contains('Done').click({force:true})
        })
    })
})