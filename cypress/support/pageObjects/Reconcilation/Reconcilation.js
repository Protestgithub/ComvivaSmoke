class Reconcilation{
    getcolumn(){
    
        return cy.iframe().find('.wwFormTableC  tbody>tr>td')
    }
    getProviderSelect(){
        return cy.get('select[id="reconciliation_loadReconciliationMultiCurr_providerName"]')
    }
    getprovider1()
    {   
        return cy.get('select[id="reconciliation_loadReconciliationMultiCurr_providerName"]> option')
    }
    getmismatch(){
        return cy.iframe().find('table.wwFormTableC tbody:nth-child(2) tr')
    }
    getmismatchvalue(){
        return cy.get('td.tableft')
    }
    getsubmit(){
        return cy.iframe().find('.btn1')
    }

    }export default Reconcilation