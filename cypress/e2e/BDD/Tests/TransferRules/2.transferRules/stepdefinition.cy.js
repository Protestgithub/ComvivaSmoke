/// <reference types="Cypress" />
/// <reference types = "Cypress-iframe"/>

//----------------Imports---------------------------------------------------------------------
import 'cypress-iframe'
import { Given, When, Then, And, Before } from "@badeball/cypress-cucumber-preprocessor";
import homePage from '../../../../../support/pageObjects/homePage';

import "../../../../../support/commands";
import TransferRulePage from '../../../../../support/pageObjects/TransferRules/TransferRulePage';
import Approval from '../../../../../support/pageObjects/TransferRules/Approval';
import O2C from '../../../../../support/pageObjects/TransferRules/O2C';


//----------------Object Declaration----------------------------------------------------------

const welcomePage = new homePage()
const transferrulepage = new TransferRulePage()
const transferruleapprovalpage = new Approval()
const transferrulepageO2C = new O2C()
var DataFile = "cypress/fixtures/userData/Domain&CAT.json"
var GradeFile = 'cypress/fixtures/userData/Gradedata.json'

var  name
function getRandomName() {
  name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 5; i++)
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  return name;
}

//----------------BDD Hooks-----------------------------------------------------------------
Before(() => {
  cy.fixture('login').then(function (data1) {
    this.data1 = data1;
  })
  cy.fixture('UserManagement').then(function (data2) {
    this.data2 = data2;
  })

  cy.fixture('TransferRules').then(function (data3) {
    this.data3 = data3;
  })

});


//----------------Test Scripts---------------------------------------------------------------


//----------------------------suspend-----------------------------//


And('Suspend the status in transfer rule', function () {
  cy.wait(2000)

  transferrulepage.getStatus().select(this.data3.TransferRuleData.Status1, { force: true })
  transferrulepage.getTransferType().select(this.data3.TransferRuleData.TransferType, { force: true })
  transferrulepage.getGeographicalDomain().select(this.data3.TransferRuleData.GeographicalDomain, { force: true })
})

//----------------------------Transferrule approval----------------------------//
