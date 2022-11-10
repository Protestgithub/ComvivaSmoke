class BulkPayout{

    getBulkPayoutLink()
    {
        return cy.get('#collapsible_listnode_8')
    }

    getBulkPayoutInitiateLink()
    {
       return cy.get('[data-testid="menu.bulkpay"]').find('[title="Bulk Payout Initiate"]')

       
    }
    getServicename()
    {
        return cy.iframe().find('.browser-default.ng-untouched.ng-pristine.ng-valid')
      
    }

    getUploadLink()
    { 
        return cy.iframe().find('input[type="file"]')
        
    }
    getDownloadTemplate()
    {
        return cy.iframe().find('a[target="_blank"]')   
    }
    
    getRemark()
    {
        return cy.iframe().find('#remarks')
    }

    
    getSubmit()
    {
        
        return cy.iframe().find('button[type="submit"]')
      
    }
    getBulkApprove()
    {
        return cy.get('[data-testid="menu.bulkpay"]').find('[title="Bulk Payout Approve"]')
       
    }

    getBulkInitiatedBy()
    {
        return cy.iframe().find('span.primary_color_dark.fnt_wight600').eq(0)
    }

    getBulkApproveButton()
    {
        return cy.iframe().find('div.col.s6.div-button-border.center.active-color.approve_btn')
    }

    getTextBox()
    {
        return cy.iframe().find('div.alert.alert-success')
       
    }

    getBulkDashboard()
    {
        return cy.get('[data-testid="menu.bulkpay"]').find('[title="Bulk Payout Dashboard"]')
    }

    getNumberOfEntries()
    {
        return cy.iframe().find('div.col.s4.pd_zero >span.lh.collapse_btnPD1').eq(0)
    }


    getBatchIDFromBox()
    {
        return cy.iframe().find('section.col.s3.pd_zero > div.bulk_id_box.div-download-data.center > div span.primary_color_dark.bulkID')
    }

    getSuccessAsOne()
    {
        return cy.iframe().find('span.primary-color-light_success_count')
    }

}
export default BulkPayout