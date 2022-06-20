class DownloadAmb{

    getAmbtype(){
    return cy.iframe().find('select[id="settlementType"]')
    }
    getPartyType(){
     return cy.iframe().find('select[id="partyType"]')
    }
    getPartyName(){
    return cy.iframe().find('select[id="partyId"]')
    }
    getFromdate(){
        return  cy.iframe().find('input[name="dojo.fromDateStr"]')
    }
    getTodate(){
        return cy.iframe().find('input[name="dojo.toDateStr"]')
    }
    getDownloadbttn(){
        return cy.iframe().find('#submitButton')
    }
}
export default DownloadAmb