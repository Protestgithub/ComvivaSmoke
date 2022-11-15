class TransferControlProfile{

    getNew()
    {
        return cy.iframe().find('div#add_new div.form_label [type=button]')
    }
    getinstrumentlevelTCP()
    {
        return cy.iframe().find('.panel-heading tbody>tr', "{force:true}")
    }
    getdelete()
    {
        return cy.iframe().find('#profile_list>table>tbody>tr')
    }
    getback()
    {
        return cy.iframe().find('button[class="enableDisabled"]')
    }
    getViewDetails()
    {
       return cy.iframe().find('.profile_list tbody>tr')
    }
    getEditDetails()
    {
        return cy.iframe().find('#cust_tcp_list .profile_list tbody>tr:nth-child(2)>td:nth-child(8)')
    }
    getDeleteDetails()
    {
        return cy.iframe().find('#cust_tcp_list .profile_list tbody>tr:nth-child(3)>td:nth-child(9)')
    }
    getdeleteicon()
    {
        return cy.get("span.glyphicon.glyphicon-trash")
    }
    getprovider()
    {
        return cy.iframe().find('#provider')
    }
    getregulatorytype(){
        return cy.iframe().find('#registrationType')
    }
    getsucessmessage()
    {
        return cy.iframe().find('#main_success_msg')
    }
    getErrorMessage(){

        return cy.iframe().find('#add_modal_error_msg')
    }
    getMarketingError()
    {
        return cy.iframe().find('#display_error_message')
    }
    geterror()
    {
        return cy.iframe().find('.error_message')
    }
    getSuccess()
    {
        return cy.iframe().find('div.success_image')
    }
    getReqtoAdd(){

        return cy.iframe().find('.success_image#successMessage')
    }
    getReqtoAddMaster()
    {
        return cy.iframe().find('.success_image')
    }
    getReqtoAddIntiationMaster()
    {
        return cy.iframe().find('.success_image#add_action_message')
    }
    getdomain()
    {
        return cy.iframe().find('#domain')
    }
    getcategory()
    {
        return cy.iframe().find('#category')
    }
    getgrade(){
        return cy.iframe().find('#grade')
    }
    getpaymentinstrument()
    {
        return cy.iframe().find('#payment_instrument')
    }
    getwallettype()
    {
        return cy.iframe().find('#wallet_type')
    }
    getprofilename()
    {
        return cy.iframe().find('#profile_name')
    }
    getdescription()
    {
        return cy.iframe().find('#description')
    }
    getadd(){
        return cy.iframe().find('#add_customer')
    }
    getCreate()
    {
        return cy.iframe().find('#add_instrument')
    }
    getcount()
    {
        return cy.iframe().find('.style_even>td:nth-child(3) [thresholdtype="Per Transaction"]')
    }
     getcount1()
    {
        return cy.iframe().find('tr.style_even:nth-child(5) td.count_def.amount:nth-child(3) > input.allserv')
    }
getcount2()
    {
        return cy.iframe().find('tr.style_even:nth-child(5) td.count_def.amount:nth-child(5) > input.allserv')
    }
getcount3()
    {
        return cy.iframe().find('tr.style_even:nth-child(5) td.count_def.amount:nth-child(7) > input.allserv')
    }

getcount4()
    {
        return cy.iframe().find('tr.style_even:nth-child(5) td.count_def.amount:nth-child(9) > input.allserv')
    }

getcount5()
    {
        return cy.iframe().find('tr.style_even:nth-child(5) td.count_def.amount:nth-child(11) > input.allserv')
    }

getcount6()
    {
        return cy.iframe().find('tr.style_even:nth-child(5) td.count_def.amount:nth-child(13) > input.allserv')
    }

getcount7()
    {
        return cy.iframe().find('tr.style_even:nth-child(5) td.count_def.amount:nth-child(15) > input.allserv')
    }

getcount8()
    {
        return cy.iframe().find('tr.style_even:nth-child(5) td.count_def.amount:nth-child(17) > input.allserv')
    }

getcount9()
    {
        return cy.iframe().find('tr.style_even:nth-child(5) td.count_def.amount:nth-child(19) > input.allserv')
    }

getcount10()
    {
        return cy.iframe().find('tr.style_even:nth-child(5) td.count_def.amount:nth-child(21) > input.allserv')
    }

    getcountmaster()
    {
        return cy.iframe().find('.user_input [thresholdsubtype="count"]')
    }
    getAmount()
    {
        return cy.iframe().find('.user_input [thresholdsubtype="amount"]')
    }
    getLoadServiceReq()
    {
        return cy.iframe().find('.style_even>td:nth-child(15) [servicename="Load request flow"]').eq(3)
    }
    getLoadServiceReq2()
    {
        return cy.iframe().find('.style_even>td:nth-child(17) [servicename="Load request flow"]').eq(3)
    }
    getLocalPoPurchase()
    {
        return cy.iframe().find('.style_even>td:nth-child(15) [servicename="Local Pos Purchase"]').eq(1)
    }
    getLocalPoPurchase1()
    {
        return cy.iframe().find('.style_even>td:nth-child(17) [servicename="Local Pos Purchase"]').eq(1)
    }
    getlocalwithdrawal()
    {
       return cy.iframe().find('.style_even>td:nth-child(15) [servicename="Local ATM withdrwal"]').eq(1)
    }
    getlocalwithdrawal1()
    {
       return cy.iframe().find('.style_even>td:nth-child(17) [servicename="Local ATM withdrwal"]').eq(1)
    }
    getlocalwithdrawal2()
    {
       return cy.iframe().find('.style_even>td:nth-child(19) [servicename="Local ATM withdrwal"]').eq(1)
    }
    getlocalwithdrawal3()
    {
       return cy.iframe().find('.style_even>td:nth-child(23) [servicename="Local ATM withdrwal"]').eq(1)
    }
    getContactlessPayment()
    {
        return cy.iframe().find('.style_even>td:nth-child(15) [servicename="Contactless Payment"]').eq(1)
    }
    getCardATMPaymentCashout()
    {
        return cy.iframe().find('.style_even>td:nth-child(15) [servicename="Card ATM Payment Cashout"]').eq(1)
    }
    getContactlessPayment1()
    {
        return cy.iframe().find('.style_even>td:nth-child(17) [servicename="Contactless Payment"]').eq(1)
    }
    getCardATMPaymentCashout1()
    {
        return cy.iframe().find('.style_even>td:nth-child(17) [servicename="Card ATM Payment Cashout"]').eq(1)
    }

    getCardInternetPayment()
    {
        return cy.iframe().find('.style_even>td:nth-child(15) [servicename="Card Internet Payment"]').eq(1)
    }
    getCardInternetPayment1()
    {
        return cy.iframe().find('.style_even>td:nth-child(17) [servicename="Card Internet Payment"]').eq(1)
    }
    getLocalpospurchasecontactless()
    {
        return cy.iframe().find('.style_even>td:nth-child(15) [servicename="Local Pos Purchase Contactless"]').eq(1)
    }
    getLocalpospurchasecontactless1()
    {
        return cy.iframe().find('.style_even>td:nth-child(17) [servicename="Local Pos Purchase Contactless"]').eq(1)
    }
    getLoadReversalReqflow()
    {
        return cy.iframe().find('.style_even>td:nth-child(15) [servicename="Load Reversal Request Flow"]').eq(3)
    }
    getLoadReversalReqflow1()
    {
        return cy.iframe().find('.style_even>td:nth-child(17) [servicename="Load Reversal Request Flow"]').eq(3)
    }
    getcardpayment()
    {
        return cy.iframe().find('.style_even>td:nth-child(15) [servicename="Card Payment"]').eq(1)
    }
    getcardadujsment()
    {   
        return cy.iframe().find('.style_even>td:nth-child(15) [servicename="Card Adjustment"]').eq(1)
    }
    getQRMerchantPayment()
    {
        return cy.iframe().find('.style_even>td:nth-child(15) [servicename="QR Merchant Payment"]').eq(1)
    }
    getcardpayment1()
    {
        return cy.iframe().find('.style_even>td:nth-child(17) [servicename="Card Payment"]').eq(1)
    }
    getcardadujsment1()
    {   
        return cy.iframe().find('.style_even>td:nth-child(17) [servicename="Card Adjustment"]').eq(1)
    }
    getQRMerchantPayment1()
    {
        return cy.iframe().find('.style_even>td:nth-child(17) [servicename="QR Merchant Payment"]').eq(1)
    }
   
    getUserminbalance()
    {
        return cy.iframe().find('#user_min_balance_add')
    }
    getUsermaximumbalance()
    {
        return cy.iframe().find('#user_maximum_balance_add')
    }
    getusermaxbalanceMaster()
    {
        return cy.iframe().find('#user_maximum_balance')
    }
    getUserMinTransactionAmount()
    {
        return cy.iframe().find('#minimum_transaction_amount_add')
        
    }
    getUserMaxTransactionAmount()
        {
            return cy.iframe().find('#maximum_transaction_amount_add')
        }
    getMaxPercentageTransferAllowed()
    {
        return cy.iframe().find('#maxPctTrnsAllwd_add')
    }    
    getNext()
    {
        return cy.iframe().find('#add_instrument_next')
    }
    
    getReset()
    {
        return cy.iframe().find('add_reset')
    }
    
    getApproveTCP()
    {
        return cy.iframe().find('.approveButton').eq(0)
    }
    getApproveTCP1()
    {
        return cy.iframe().find('button[id=approve_button]')
    }
    getEditbutton()
    {
        return cy.iframe().find('#edit_customer_next')
    }
    geteditfeild(){
        return cy.iframe().find('#description_edit')
    }
    getProfileName(){
        return cy.iframe().find('#profile_name_edit')
    }
    getNextEdit()
    {
        return cy.iframe().find('#add_customer_next')
    }
    getConfirmEdit(){
        return cy.iframe().find('#add_customer_confirm')
    }
    getPerTransaction(){
        return cy.iframe().find(".threshhold_table > tbody > tr > td > input.allserv[thresholdtype='Per Transaction']")
    }
    }export default TransferControlProfile