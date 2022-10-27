class ChanneltoChannel{

    getDomain() {

        return cy.iframe().find('#sel')

    }
    getPayeeMFSProvider(){
        return cy.iframe().find('otherProviderListSel')
    }
    getPayeeInst(){
        return cy.iframe().find('#otherWalletListId').eq(2)
    }
    getToDomain(){
        return cy.iframe().find('#ops1')
    }
    getmsisdn(){
        return cy.iframe().find('#accessIdId')
    }
getSubmit(){
    return cy.iframe().find('#selectForm_button_submit')
}
getInverseSubmit(){
    return cy.iframe().find('#inverseC2cTrf_userDetails_button_submit')
}
getInversesubmit(){
    return cy.iframe().find('#inverseC2cTrf_confirm_button_submit')
}
getsubmit(){
    return cy.iframe().find('#c2cTrf_confirm_button_submit')
}
getInverseConfrim(){
    return cy.iframe().find('#inverseC2cTrf_confirm_c2c')
}

getamount(){
    return cy.iframe().find('#amount')
}
getInverseamount(){
    return cy.iframe().find('#inverseC2cTrf_confirm_amount')
}

getpaymentid(){
    return cy.iframe().find('#c2cTrf_confirm_paymentId')
}

getInversepaymentid(){
    return cy.iframe().find('#inverseC2cTrf_confirm_paymentId')
}

getconfirm(){
    return cy.iframe().find('#c2cTrf_confirm_c2c')
}
getsucessmessage(){
    return cy.iframe().find('.actionMessage')
}
}export default ChanneltoChannel



