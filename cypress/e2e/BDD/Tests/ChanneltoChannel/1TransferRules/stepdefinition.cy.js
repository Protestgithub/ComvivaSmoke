/// <reference types="cypress" />
/// <reference types = "Cypress-iframe"/>
//----------------Imports---------------------------------------------------------------------

import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from '../../../../../support/pageObjects/loginPage';
import homePage from '../../../../../support/pageObjects/homePage';
import "../../../../../support/utils/Generic";
import TransferRulePage from '../../../../../support/pageObjects/TransferRules/TransferRulePage.js';
import Approval from '../../../../../support/pageObjects/TransferRules/Approval.js';
import ChanneltoChannel from '../../../../../support/PageObjects/ChanneltoChannel/ChanneltoChannel';

//----------------Object Declaration-----------------------------------------------------------------

const pageLogin = new loginPage()
const welcomePage = new homePage()  
const C2C = new ChanneltoChannel()
const transferrulepage = new TransferRulePage()
const transferruleapprovalpage = new Approval()
var BuisnessReg = 'cypress/fixtures/userData/BusinessUsersData.json'
var BusinessO2CReg = 'cypress/fixtures/userData/BusinessUsersDataO2C.json'
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

//---------------------------creation ---------------
And('Select the Service Name and from details for C2C', function () {
  cy.wait(2000)
  transferrulepage.getServiceName().select(this.data13.TransferRuleForC2C.Servicename, { force: true })
  cy.wait(4000)
  //cy.mfsprovider()
  transferrulepage.getFromMFSProvider().select(this.data13.TransferRuleForC2C.FromMFSprovider, { force: true })
  cy.wait(4000)
  
    transferrulepage.getFromeDomain().select(this.data13.TransferRuleForC2C.FromDomain, { force: true })
 
  transferrulepage.getFromPaymentInstrument().select(this.data13.TransferRuleForC2C.FromPaymentInstrument, { force: true })
  transferrulepage.getFromWallettype().select(this.data13.TransferRuleForC2C.FromWallet, { force: true })
})
And('Select the Service Name and from details for Inverse C2C', function () {
  cy.wait(2000)
  transferrulepage.getServiceName().select(this.data13.TransferRuleForC2C.Servicename1, { force: true })
  cy.wait(4000)
  //cy.mfsprovider()
  transferrulepage.getFromMFSProvider().select(this.data13.TransferRuleForC2C.FromMFSprovider, { force: true })
  cy.wait(4000)
  
    transferrulepage.getFromeDomain().select(this.data13.TransferRuleForC2C.FromDomain, { force: true })
 
  transferrulepage.getFromPaymentInstrument().select(this.data13.TransferRuleForC2C.FromPaymentInstrument, { force: true })
  transferrulepage.getFromWallettype().select(this.data13.TransferRuleForC2C.Towallet2, { force: true })
})
And('Select the Service Name and from details for Inverse C2C1', function () {
  cy.wait(2000)
  transferrulepage.getServiceName().select(this.data13.TransferRuleForC2C.Servicename1, { force: true })
  cy.wait(4000)
  //cy.mfsprovider()
  transferrulepage.getFromMFSProvider().select(this.data13.TransferRuleForC2C.FromMFSprovider, { force: true })
  cy.wait(4000)
  
    transferrulepage.getFromeDomain().select(this.data13.TransferRuleForC2C.FromDomain, { force: true })
 
  transferrulepage.getFromPaymentInstrument().select(this.data13.TransferRuleForC2C.FromPaymentInstrument, { force: true })
  transferrulepage.getFromWallettype().select(this.data13.TransferRuleForC2C.Towallet1, { force: true })
})


And('Select the To details for Initiaion for C2C', function () {
  cy.wait(2000)
  transferrulepage.getToMFSProvider().select(this.data13.TransferRuleForC2C.ToMFSprovider, { force: true })
  transferrulepage.getToDomain().select(this.data13.TransferRuleForC2C.ToDomain, { force: true })
  transferrulepage.getToPaymentInstrument().select(this.data13.TransferRuleForC2C.ToPaymentInstrument, { force: true })
  transferrulepage.getToWallettype().select(this.data13.TransferRuleForC2C.ToWallet, { force: true })
  transferrulepage.getSubmitbttn().click()
  cy.wait(2000)
})

And('Select the To details for Initiaion for C2C1', function () {
  cy.wait(2000)
  transferrulepage.getToMFSProvider().select(this.data13.TransferRuleForC2C.ToMFSprovider, { force: true })
  transferrulepage.getToDomain().select(this.data13.TransferRuleForC2C.ToDomain, { force: true })
  transferrulepage.getToPaymentInstrument().select(this.data13.TransferRuleForC2C.ToPaymentInstrument, { force: true })
  transferrulepage.getToWallettype().select(this.data13.TransferRuleForC2C.Towallet1, { force: true })
  transferrulepage.getSubmitbttn().click()
  cy.wait(2000)
})

And('Select the To details for Initiaion for Inverse C2C', function () {
  cy.wait(2000)
  transferrulepage.getToMFSProvider().select(this.data13.TransferRuleForC2C.ToMFSprovider, { force: true })
  transferrulepage.getToDomain().select(this.data13.TransferRuleForC2C.ToDomain, { force: true })
  transferrulepage.getToPaymentInstrument().select(this.data13.TransferRuleForC2C.ToPaymentInstrument, { force: true })
  transferrulepage.getToWallettype().select(this.data13.TransferRuleForC2C.FromWallet, { force: true })
  transferrulepage.getSubmitbttn().click()
  cy.wait(2000)
})



//-----------------------------------------------------------------------------------






And('Select Status,Transfer type,Geographical Domain and Controlled Trf Level for C2C', function () {
  cy.wait(3000)
  transferrulepage.getStatus().select(this.data13.TransferRuleForC2C.Status, { force: true })
  transferrulepage.getTransferType().select(this.data13.TransferRuleForC2C.TransferType, { force: true })
  transferrulepage.getGeographicalDomain().select(this.data13.TransferRuleForC2C.GeographicalDomain, { force: true })
  transferrulepage.getDirectTransferAllowed().check()
  transferrulepage.getBypassAllowed().check()

})

And('Select rule and approval for C2C', function () {
  cy.wait(3000)
 
    cy.getTransferApprovalC2C()

    //transferruleapprovalpage.getSubmitbttn().click({force:true})
    // .should(function () {
    //  expect(this.windowConfirm).to.be.calledWith('Are you sure you want to Reject?')
    //     //expect(this.consoleLog).to.be.calledWith('CONFIRMED')  // passes
    //   })
    cy.wait(4000)
   transferruleapprovalpage.getSubmitbttn().click({force:true})
})





  Given('Login into Mobiquity Portal as Channel User', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
    cy.wait(8000)
    cy.readFile('cypress/fixtures/userData/BusinessUsersData.json').then((data)=>{
      var loginID
      loginID = data.LoginId
     // cy.login(loginID, this.data1.businessAdmin.DefaultPassword)
      //cy.login1(this.data1.businessAdmin.businessadminPwd1)
      //cy.wait(2000)
      //cy.Passwordchange(this.data1.UserCreationSuccessMessage)
      //pageLogin.getloginbtn1().click({force:true})
      cy.login(loginID, this.data1.businessAdmin.businessadminPwd1)
         
      
  })
  })
  Given('Login into Mobiquity Portal as Channel User1', function () {
    cy.launchURL(Cypress.env('Adminurl'))
    cy.visit(Cypress.env("Adminurl") + "/dfscontainer/#/business/")
    cy.wait(8000)
    cy.readFile('cypress/fixtures/userData/BusinessUsersDataO2C.json').then((data)=>{
      var loginID
      loginID = data.LoginId
      //cy.login(loginID, this.data1.businessAdmin.DefaultPassword)
      //cy.login1(this.data1.businessAdmin.businessadminPwd1)
      //cy.wait(2000)
      //cy.Passwordchange(this.data1.UserCreationSuccessMessage)
      //pageLogin.getloginbtn1().click({force:true})
      cy.wait(2000)
      cy.login(loginID, this.data1.businessAdmin.businessadminPwd1)
         
      
  })
  })
  
  And('Click on Channel to Channel Link and Enter Details',function(){

    welcomePage.getChanneltoChannel().click({force:true})
    cy.wait(3000)
    C2C.getDomain().select(this.data20.FromDomain)
    C2C.getToDomain().select(this.data20.ToDomain)

  //  cy.intercept("/CoreWeb/stock/c2cTrf_ajaxLoadProviders.action?accessId=")
    cy.readFile(BusinessO2CReg).then((data) => {
      let MSISDN = data.registeredMobileO2C
    C2C.getmsisdn().type(MSISDN)
    })
   // cy.checkAPI("/CoreWeb/stock/c2cTrf_ajaxLoadProviders.action?accessId=")
    //cy.intercept("/CoreWeb/stock/c2cTrf_userDetails.action")
    cy.wait(6000)
    C2C.getSubmit().click({force:true})
    cy.wait(6000)
    C2C.getSubmit().click({force:true})
   // cy.checkAPI("/CoreWeb/stock/c2cTrf_userDetails.action")
   cy.wait(6000)
    C2C.getamount().type('1')
    cy.wait(3000)
    C2C.getpaymentid().type('345')
    cy.wait(6000)    
    C2C.getsubmit().click({force:true})    
    cy.wait(3000)
    C2C.getconfirm().click({force:true})
    cy.wait(3000)
    C2C.getsucessmessage().contains(this.data20.SucessMessage)
    cy.C2CTransactionWriteData()
  })

  And('Click on Inverse Channel to Channel Link and Enter Details',function(){

    welcomePage.getInverseChanneltoChannel().click({force:true})
    cy.wait(3000)
    C2C.getDomain().select(this.data20.FromDomain)
    C2C.getToDomain().select(this.data20.ToDomain)
    cy.readFile(BuisnessReg).then((data) => {
      let MSISDN = data.registeredMobile
    C2C.getmsisdn().type(MSISDN)
        cy.wait(5000)

    })
    C2C.getInverseSubmit().click({force:true})
    cy.wait(5000)
    C2C.getInverseSubmit().click({force:true})
    cy.wait(5000)
    C2C.getInverseamount().type('1')
    cy.wait(3000)
    C2C.getInversepaymentid().type('345')
    cy.wait(5000)
    C2C.getInversesubmit().click({force:true})
    cy.wait(3000)
    C2C.getInverseConfrim().click({force:true})
    cy.wait(5000)
    C2C.getsucessmessage().contains(this.data20.InverseIntiatedMessage)
    cy.InverseC2CTransactionWriteData()
  })
  And('Select the From & To category as Wholesaler', function () {
    cy.wait(2000)
    
      transferrulepage.getFromCategory().select(this.data13.TransferRuleForC2C.FromDomain, { force: true })
    
    transferrulepage.getToCategory().select(this.data13.TransferRuleForC2C.ToDomain, { force: true })
    })
  