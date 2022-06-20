/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "cypress-cucumber-preprocessor/steps";
import loginPage from '../../../../support/pageObjects/loginPage';
import homePage from '../../../../support/pageObjects/homePage';

import "../../../../support/commands";
import "../../../../support/TransferControlProfileCommand";
import TransferControlProfile from '../../../../support/pageObjects/TransferControlProfile';
import { first } from 'lodash';
import { forEachChild } from 'typescript';
import MarketingProfile from '../../../../support/pageObjects/UserManagement/MarketingProfile';
import RegulatoryProfile from '../../../../support/pageObjects/UserManagement/RegulatoryProfile';

const pageLogin = new loginPage()
const welcomePage = new homePage()
const tcpPage = new TransferControlProfile()
const MarketingProfile1 = new MarketingProfile()
const RegulatoryProfile1 = new RegulatoryProfile()
var mobile
var number
const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const filenameTCP = 'userData/TCPdata.json'
const CustTCPdata = 'userData/CustTCPdata.json'
const fileRegulatoryProfile = 'userData/RegulatoryProfile.json'
var Tcpname
var Tcpname1
var RName


Before(() => {
  cy.fixture('login').then(function (data1) {

    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })
  cy.fixture('TransferControlProfile').then(function (data5) {
    this.data5 = data5;
  })
  cy.fixture('userData/RegulatoryProfile').then(function (data8) {
    this.data8 = data8;
  })
  cy.fixture('userData/RegulatoryProfile').then(function (data8) {
    this.data8 = data8;
  })


});

Given('Login into Mobiquity Portal as System admin User', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})

Given('Login into Mobiquity Portal as System admin User2', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.SysAdminlogin2()
  cy.wait(2000)
  cy.checkWelcomeText(this.data2.networkAdminWelcomeText)
})
//superadminm
Given('Login into Mobiquity Portal as Super admin Maker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminmaker.sysAdminUser1, this.data1.masteradminmaker.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data1.superadminm.superadminmaker)
})
//superadminc
Given('Login into Mobiquity Portal as Super admin Checker', function () {
  cy.launchURL(Cypress.env('Adminurl'))
  cy.login(this.data1.masteradminchecker.sysAdminUser1, this.data1.masteradminchecker.sysAdminPwd1)
  cy.wait(2000)
  cy.checkWelcomeText(this.data1.superadminc.superadminchecker)
})


When('Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP', function () {
  welcomePage.getTransferControlProfile().click()
  cy.wait(3000)
  welcomePage.getManageInstrumentLevelTCP().click()
  cy.wait(3000)
})
When('Navigate to Transfer Control Profile', function () {
  welcomePage.getTransferControlProfileSA().click()
  cy.wait(3000)
})
And('Click on Create Button', function () {
  tcpPage.getCreate().click({ force: true })
})
And('Click on New Button', function () {

  tcpPage.getNew().click({ force: true })
  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
  cy.fixture(fileRegulatoryProfile).then((user) => {
    RName = user.RegulatoryProfileName
    cy.log(RName)
    tcpPage.getregulatorytype().select(RName, { force: true })
  })
  //cy.TCPMasRandomName()
  tcpPage.getprofilename.type(getRandomName(),{force:true})
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description)
  /* recurse( 
     ()=> getRandomName(), 
     ()=>tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true }), 
     ()=>cy.wait(200),   
     (uniqueness) => (uniqueness) == tcpPage.getErrorMessage().contains 
     ('Please select another profile name as this profile name is being used by an active profile').should('be.visible'), 
     tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })    
    )*/
  tcpPage.getadd().click({ force: true })
  cy.wait(3000)
  const uuid = () => Cypress._.random(1e3)
  number = uuid()
  tcpPage.getAmount().each((e1, index, list) => {
    cy.wrap(e1).type(number)
  })
  tcpPage.getcountmaster().each((e1, index, list) => {
    cy.wrap(e1).type(number)
  })
  tcpPage.getusermaxbalanceMaster().type(this.data5.TransferControlProfile.UserMaxBal)
  tcpPage.getNextEdit().click({ force: true })
  tcpPage.getConfirmEdit().click({ force: true })

})

And('Verify Success Message for creation of TCP through Master admin', function () {
  cy.fixture(CustTCPdata).then((user) => {
    Tcpname1 = user.CustTCPProfileName
    cy.wait(2000)
    cy.log(Tcpname1)
    tcpPage.getReqtoAddMaster().should("have.text", this.data5.confimationMessage.addIntiationPart1Master + Tcpname1 + this.data5.confimationMessage.addIntiationPart2Master)
  })
})


When('Navigate to Transfer Control Profile to View Details', function () {

  welcomePage.getTransferControlProfileSA().click()
  cy.wait(3000)
  cy.TcpName1()
  tcpPage.getViewDetails().each(($row => {

    cy.wrap($row).within(function () {

      cy.get('td.name').each(($el => {

        if ($el.text() == Tcpname1) {
          cy.get('span.glyphicon.glyphicon-info-sign').click({ force: true })

        }
      }))
    })
  }))
  tcpPage.getback().contains("Back").click({ force: true })
})
When('Navigate to Transfer Control Profile to Edit Details', function () {

  welcomePage.getTransferControlProfileSA().click()
  cy.wait(3000)
  cy.TcpName1()
  tcpPage.getViewDetails().each(($row => {

    cy.wrap($row).within(function () {


      cy.get('td.name').each(($el => {

        if ($el.text() == Tcpname1) {
          cy.get('span.glyphicon.glyphicon-edit').click({ force: true })

        }
      }))
    })
  }))

  tcpPage.getEditbutton().click({ force: true })
  cy.wait(3000)
  tcpPage.getNextEdit().click({ force: true })
  tcpPage.getConfirmEdit().click({ force: true })
})

Then('Verify Success Message for Edit', function () {
  cy.fixture(CustTCPdata).then((user) => {
    Tcpname1 = user.CustTCPProfileName
    cy.wait(2000)
    cy.log(Tcpname1)
    tcpPage.getSuccess().should("contain", this.data5.confimationMessage.editSucesspart1 + Tcpname1 + this.data5.confimationMessage.editSucesspart2)
  })
})
Then('Verify the Modification Request message', function () {
  cy.TcpName1()
  tcpPage.getSuccess().should("contain", this.data5.confimationMessage.editapproval1 + Tcpname1 + this.data5.confimationMessage.editapproval2)
})
Then('Verify Success Message for deletion', function () {

  tcpPage.getMarketingError().should("contain", this.data5.confimationMessage.DeletionError)

})
When('Navigate to Transfer Control Profile to Delete Details', function () {

  welcomePage.getTransferControlProfileSA().click()
  cy.wait(3000)
  cy.TcpName1()
  tcpPage.getViewDetails().each(($row => {

    cy.wrap($row).within(function () {

      cy.get('td.name').each(($el => {

        if ($el.text() == Tcpname1) {
          cy.get('span.glyphicon.glyphicon-trash').click({ force: true })

        }
      }))
    })
  }))

})

Then('Verify Error Message for deletion', function () {

  tcpPage.getMarketingError().should("contain", this.data5.confimationMessage.ErrorMessMarketing)

})
And('Click on Add New Button', function () {
  pageLogin.getiFrame()
  cy.wait(3000)
  tcpPage.getNew().click({ force: true })

})

Then('Enter required Fields', function () {

  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
  tcpPage.getgrade().select(this.data5.TransferControlProfile.Grade, { force: true })
  tcpPage.getpaymentinstrument().select(this.data5.TransferControlProfile.PaymentInstrument, { force: true })
  tcpPage.getwallettype().select(this.data5.TransferControlProfile.Wallet, { force: true })
  //cy.TCPRandomName()
  tcpPage.getprofilename().type(getRandomName(), { force: true })
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })
  /* recurse( 
     ()=> getRandomName(), 
     ()=>tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true }), 
     ()=>cy.wait(200),  
     (uniqueness) => (uniqueness) == tcpPage.getErrorMessage().contains 
     ('Please select another profile name as this profile name is being used by an active profile').should('be.visible'), 
     tcpPage.getdescription().type(this.data5.TransferControlProfile.Description, { force: true })    
   )*/
})
Then('Enter required Fields for error message', function () {

  tcpPage.getprovider().select(this.data5.TransferControlProfile.Provider, { force: true })
  tcpPage.getdomain().select(this.data5.TransferControlProfile.Domain, { force: true })
  tcpPage.getcategory().select(this.data5.TransferControlProfile.Category, { force: true })
  tcpPage.getgrade().select(this.data5.TransferControlProfile.Grade, { force: true })
  tcpPage.getpaymentinstrument().select(this.data5.TransferControlProfile.PaymentInstrument, { force: true })
  tcpPage.getwallettype().select(this.data5.TransferControlProfile.Wallet, { force: true })
  cy.fixture(filenameTCP).then((user) => {
    Tcpname = user.TcpProfileName
    cy.log(Tcpname)
    tcpPage.getprofilename().type(Tcpname)
  })
  tcpPage.getdescription().type(this.data5.TransferControlProfile.Description)

})

Then('Verify Error Message', function () {

  tcpPage.getErrorMessage().should("contain", this.data5.confimationMessage.ErrorMessageApproval)
})
Then('Verify Error Message for Provider', function () {
  tcpPage.geterror().should("contain", this.data5.confimationMessage.Providererror)
})
Then('Verify Error Message for Domain', function () {
  tcpPage.geterror().should("contain", this.data5.confimationMessage.Domainerror)
})
Then('Verify Error Message for Category', function () {
  tcpPage.geterror().should("contain", this.data5.confimationMessage.Categoryerror)
})
Then('Verify Error Message for Grade', function () {
  tcpPage.geterror().should("contain", this.data5.confimationMessage.Gradeerror)
})

Then('Verify Success Message', function () {
  cy.fixture(filenameTCP).then((user) => {
    Tcpname = user.TcpProfileName
    cy.log(Tcpname)
    tcpPage.getsucessmessage().should("contain", this.data5.confimationMessage.successfulTcpIntiation + Tcpname + this.data5.confimationMessage.successpart2)
  })
})
Then('Verify the Approval message', function () {
  tcpPage.getsucessmessage().should("contain", this.data5.confimationMessage.SuccessTCP + profile)
})


Then('Enter all required amount and count', function () {
  pageLogin.getiFrame()
  cy.wait(3000)
  const uuid = () => Cypress._.random(1e3)
  number = uuid()
  tcpPage.getcount().each((e1, index, list) => {
    cy.wrap(e1).type(number)
  })
  tcpPage.getLoadServiceReq().type(number)
  tcpPage.getLoadServiceReq2().type(number)
  tcpPage.getUserminbalance().type(this.data5.TransferControlProfile.UserMinBal)
  tcpPage.getUsermaximumbalance().type(this.data5.TransferControlProfile.UserMaxBal)
  tcpPage.getUserMinTransactionAmount().type(this.data5.TransferControlProfile.MinTranAmount)
  tcpPage.getUserMaxTransactionAmount().type(this.data5.TransferControlProfile.MaxTranAmount)
  tcpPage.getMaxPercentageTransferAllowed().type(this.data5.TransferControlProfile.MaxPerAllowed)
  tcpPage.getNext().click({ force: true })
  cy.wait(3000)
  tcpPage.getNext().click({ force: true })
  cy.wait(3000)
  welcomePage.getTransferControlProfile()
    .scrollIntoView()
})

And('Click on Instrument Level TCP', function () {
  welcomePage.getTransferControlProfile().click()
  welcomePage.getInstrumentLevelTCPApproval().click()
  cy.wait(4000)
  tcpPage.getinstrumentlevelTCP().within(function () {
    cy.fixture(filenameTCP).then((user) => {
      Tcpname = user.TcpProfileName
      cy.log(Tcpname)
      cy.get("td").eq(1)
      cy.get("a").contains(Tcpname).click({ force: true })
    })
  })
  tcpPage.getApproveTCP().click({ force: true })
})

Then('Approve the TCP', function () {
  cy.fixture(CustTCPdata).then((user) => {
    Tcpname1 = user.CustTCPProfileName
    cy.log(Tcpname1)
  })
  tcpPage.getinstrumentlevelTCP().each(($row => {
    cy.wrap($row).within(function () {
      cy.get('td').each(($el => {
        if ($el.text() == Tcpname1) {
          cy.get('a').click({ force: true })

        }
      }))
    })

  }))
  tcpPage.getApproveTCP1().click({ force: true })
})

When('Navigate to User Management and Click on manage user', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getManageUsersLink().click()

})
When('Navigate to User Management and Click on Marketing Profile', function () {
  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getMarketingProfileLink().click()

})
Then('Click on Edit Marketing Profile and associate the created TCP with Marketing Profile', function () {

  MarketingProfile1.getEditMArketingProfile().click({ force: true })
  MarketingProfile1.getMarketingProfileMFSProvider().click()
  MarketingProfile1.getMarketingProfileMFSProvider1().click()
  MarketingProfile1.getMarketingProfileWalletType().click()
  MarketingProfile1.getMarketingProfileWalletType2().click()
  MarketingProfile1.getMarketingProfileGrade().click()
  MarketingProfile1.getMarketingProfileGrade2().click()
  MarketingProfile1.getMarketingProfileInstrumentTCP().click()
  cy.fixture(filenameTCP).then((user) => {
    Tcpname = user.TcpProfileName
    cy.log(Tcpname)
    MarketingProfile1.getMarketingProfileInstrumentTCP2().contains(Tcpname).click()
  })
  MarketingProfile1.getsave().click({ force: true })

})
Then('Click on delete icon', function () {

  cy.wait(3000)
  tcpPage.getdelete().within(function () {
    cy.get("td")
    cy.wait(5000)
    cy.TcpName()
    tcpPage.getdeleteicon().contains(Tcpname).click({ force: true })

  })
})
When('Navigate to UserManagement And Click on Regulatory Profile', function () {

  welcomePage.getUserManagementOption().scrollIntoView()
  welcomePage.getUserManagementOption().click()
  welcomePage.getregulatoryprofile().click()
  cy.wait(3000)
})
And('click on Add Regulatory Profile and Enter Profile Code and Profile Name', function () {

  RegulatoryProfile1.getaddregulatoryprofile().click()
  RegulatoryProfile1.getregulatoryprofilecode().type(id, { force: true })
  cy.RPRandomName()
})

Then('Click On Save Regulatory Profile', function () {

  RegulatoryProfile1.getregulatorysavebtn().click()
  RegulatoryProfile1.getrpsuccess().contains(this.data2.Sucess)
  cy.wait(3000)

})
And('Verify Add Intiation Message', function () {
  cy.TcpName()
  tcpPage.getReqtoAdd().should("contain", this.data5.confimationMessage.addIntiationPart1 + Tcpname + this.data5.confimationMessage.addIntiationPart2)
  cy.wait(3000)
})
And('Verify Add Intiation Message for Master', function () {
  cy.fixture(CustTCPdata).then((user) => {
    Tcpname1 = user.CustTCPProfileName
    cy.log(Tcpname1)
    tcpPage.getReqtoAddIntiationMaster().should("contain", this.data5.confimationMessage.sucessMasterTcpIntiation + Tcpname1 + this.data5.confimationMessage.successpart2Master)
    cy.wait(3000)
  })
})