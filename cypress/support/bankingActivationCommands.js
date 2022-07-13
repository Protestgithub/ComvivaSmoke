//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import BankingActivation from '../support/pageObjects/BankingChannelActivation/BankingActivation';
//----------------Object Declaration----------------------------------------------------------
const bankingActivationPage = new BankingActivation()
var SubscriberMsg = 'cypress/fixtures/userData/subscriberMsg.json'


//------------------------------------------------------------------------------------------------------
Cypress.Commands.add('getMobBankingActivationMessage', () => {
    cy.intercept('/mobiquitypay/serviceRequest/resume/any').as('getmessage')
    bankingActivationPage.getConfirmButton().click({force:true})
    cy.wait(2000)
    //approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.editUser)

    //  cy.iframe().find('[id="generate-otp-icon"]').eq(0).click()
    cy.wait('@getmessage').then((interception) => {
        let response = interception.response.body
        const resValues = Object.values(response)
        let serviceRequestID = resValues[3]
        cy.log(serviceRequestID)
        let url1 = '/notify/internal/getByMessageIdOrExternalIdAndByToWhom?messageId='
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


Cypress.Commands.add('getInternetBankingActivationMessage', () => {
    cy.intercept('http://125.16.139.20:8023/dfscontainer/#/mobiquitypay/serviceRequest/resume/any').as('getmessage')
    bankingActivationPage.getConfirmButton().click({force:true})
    cy.wait(2000)
    //approvalPage.getApproveConfirmationMessage().contains(this.data2.confirmationMessage.editUser)

    //  cy.iframe().find('[id="generate-otp-icon"]').eq(0).click()
    cy.wait('@getmessage').then((interception) => {
        let response = interception.response.body
        const resValues = Object.values(response)
        let serviceRequestID = resValues[3]
        cy.log(serviceRequestID)
        let url1 = '/notify/internal/getByMessageIdOrExternalIdAndByToWhom?messageId='
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
