class ReportingSuite
{
    getclosebtn()
    {
      cy.get('tbody tr td td img[class="gwt-Image pentaho-tabWidget-close pentaho-closebutton pentaho-imagebutton-disabled"]').click()
    }
    getPentaho()
    {
      cy.get('[data-testid="test-PENTREPORT"] > .fd-nested-list__title').click()
    }
    getViewReport()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[class="pentaho-button"]').eq(0).click({force:true})
        cy.wait(10000)
      })
    }
    getBrowseFiles()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('.btn.btn-large.btn-block').eq(0).click()
      })
    }
    getbddemoreports()
    {
      cy.get('.gwt-Frame').then($element => {
      const $body = $element.contents().find('body')
      let stripe = cy.wrap($body)
      stripe.find(' [title="PRPT_Reports"]').click()
      })
    }
    getopenbtn()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[id="openButton"]').eq(0).click()
      })
    }
    getCustomerRegistrationReport()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[title="CustomerRegistrationReport.prpt"]').click()
      })
      this.getopenbtn()
    }
    getdownloadCRR()
    {
      cy.get('iframe[name="frame_0"]').then($element => {
        const $body = $element.contents().find('body')
        let stripe4 = cy.wrap($body)
        stripe4.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('pageable/pdf')
        this.getViewReport()
      })
      cy.get('iframe[name="frame_0"]').then($element => {
         const $body = $element.contents().find('body')
        let stripe4 = cy.wrap($body)
        stripe4.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/html;page-mode=page')
        this.getViewReport()
      })
      cy.get('iframe[name="frame_0"]').then($element => {
         const $body = $element.contents().find('body')
          let stripe5 = cy.wrap($body)
          stripe5.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/html;page-mode=stream')
          this.getViewReport()
      })
          cy.get('iframe[name="frame_0"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe6 = cy.wrap($body)
            stripe6.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/excel;page-mode=flow')
            this.getViewReport()
          }) 
          cy.get('iframe[name="frame_0"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe7 = cy.wrap($body)
            stripe7.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_0"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe8 = cy.wrap($body)
            stripe8.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/csv;page-mode=stream')
            this.getViewReport()
          })  
    }
    getCustomerBankingActivation()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[title="CustomerBankingActivationReport.prpt"]').click()
      })
      this.getopenbtn()
      cy.wait(10000)
        cy.get('iframe[name="frame_1"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe4 = cy.wrap($body)
            stripe4.find('.flow.parameter-wrapper > :nth-child(5) > div > select').select('pageable/pdf')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_1"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe4 = cy.wrap($body)
            stripe4.find('.flow.parameter-wrapper > :nth-child(5) > div > select').select('table/html;page-mode=page')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_1"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe5 = cy.wrap($body)
            stripe5.find('.flow.parameter-wrapper > :nth-child(5) > div > select').select('table/html;page-mode=stream')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_1"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe6 = cy.wrap($body)
            stripe6.find('.flow.parameter-wrapper > :nth-child(5) > div > select').select('table/excel;page-mode=flow')
           this.getViewReport()
          })
          cy.get('iframe[name="frame_1"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe7 = cy.wrap($body)
            stripe7.find('.flow.parameter-wrapper > :nth-child(5) > div > select').select('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_1"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe8 = cy.wrap($body)
            stripe8.find('.flow.parameter-wrapper > :nth-child(5) > div > select').select('table/csv;page-mode=stream')
            this.getViewReport()
          })          
    }
    getCustomerBlockedAccess()
    {
          cy.get('.gwt-Frame').then($element => {
            const $body = $element.contents().find('body')
            let stripe = cy.wrap($body)
            stripe.find('[title="CustomerBlockedAccess.prpt"]').click()
          })
        this.getopenbtn()
        cy.wait(10000)
        cy.get('iframe[name="frame_2"]').then($element => {
            const $body = $element.contents().find('body')       
            let stripe4 = cy.wrap($body)       
            stripe4.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('pageable/pdf')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_2"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe4 = cy.wrap($body)
            stripe4.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/html;page-mode=page')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_2"]').then($element => {   
            const $body = $element.contents().find('body')   
            let stripe5 = cy.wrap($body)
            stripe5.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/html;page-mode=stream')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_2"]').then($element => {       
            const $body = $element.contents().find('body')        
            let stripe6 = cy.wrap($body)
            stripe6.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/excel;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_2"]').then($element => {     
            const $body = $element.contents().find('body')     
            let stripe7 = cy.wrap($body)
            stripe7.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_2"]').then($element => {       
            const $body = $element.contents().find('body')       
            let stripe8 = cy.wrap($body)
            stripe8.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/csv;page-mode=stream')
            this.getViewReport()
            })
    }
    getDeletedUserReport()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[title="DeletedUsers.prpt"]').click()
      })
      this.getopenbtn()
      cy.wait(10000)
        cy.get('iframe[name="frame_3"]').then($element => {
          const $body = $element.contents().find('body')
          let stripe4 = cy.wrap($body)
          stripe4.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('pageable/pdf')
          this.getViewReport()
        })
        cy.get('iframe[name="frame_3"]').then($element => {
          const $body = $element.contents().find('body')
          let stripe4 = cy.wrap($body)
          stripe4.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/html;page-mode=page')
          this.getViewReport()
        })
        cy.get('iframe[name="frame_3"]').then($element => {
          const $body = $element.contents().find('body')
          let stripe5 = cy.wrap($body)
          stripe5.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/html;page-mode=stream')
          this.getViewReport()
        })
        cy.get('iframe[name="frame_3"]').then($element => {
          const $body = $element.contents().find('body')
          let stripe6 = cy.wrap($body)
          stripe6.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/excel;page-mode=flow')
          this.getViewReport()
        })
        cy.get('iframe[name="frame_3"]').then($element => {
          const $body = $element.contents().find('body')
          let stripe7 = cy.wrap($body)
          stripe7.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;page-mode=flow')
          this.getViewReport()
        })
        cy.get('iframe[name="frame_3"]').then($element => { 
          const $body = $element.contents().find('body') 
          let stripe8 = cy.wrap($body)
          stripe8.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/csv;page-mode=stream')
          this.getViewReport()
        })  
    }
    getSuspendUserReport()
    {
      cy.get('.gwt-Frame').then($element => {      
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[title="SuspendedCustomers.prpt"]').click()
      })
      this.getopenbtn()
      cy.wait(10000)
        cy.get('iframe[name="frame_4"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe4 = cy.wrap($body)
            stripe4.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('pageable/pdf')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_4"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe4 = cy.wrap($body)
            stripe4.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/html;page-mode=page')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_4"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe5 = cy.wrap($body)
            stripe5.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/html;page-mode=stream')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_4"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe6 = cy.wrap($body)
            stripe6.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/excel;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_4"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe7 = cy.wrap($body)
            stripe7.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_4"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe8 = cy.wrap($body)
            stripe8.find('.flow.parameter-wrapper > :nth-child(6) > div > select').select('table/csv;page-mode=stream')
            this.getViewReport()
          })
    }
    getcommissionReport()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)  
        stripe.find('[title="CommissionReport.prpt"]').click()
      })
      this.getopenbtn()
      cy.wait(10000)
        cy.get('iframe[name="frame_5"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe4 = cy.wrap($body)
            stripe4.find('.flow.parameter-wrapper > :nth-child(14) > div > select').select('pageable/pdf')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_5"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe5 = cy.wrap($body)
            stripe5.find('.flow.parameter-wrapper > :nth-child(14) > div > select').select('table/html;page-mode=stream')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_5"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe6 = cy.wrap($body)
            stripe6.find('.flow.parameter-wrapper > :nth-child(14) > div > select').select('table/excel;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_5"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe7 = cy.wrap($body)
            stripe7.find('.flow.parameter-wrapper > :nth-child(14) > div > select').select('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_5"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe8 = cy.wrap($body)
            stripe8.find('.flow.parameter-wrapper > :nth-child(14) > div > select').select('table/csv;page-mode=stream')
            this.getViewReport()
          })
    }
    getReimbursmentReport()
    {
      cy.get('.gwt-Frame').then($element => {  
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[title="ReimbursementReport.prpt"]').click()
      })
      this.getopenbtn()
      cy.wait(10000)
        cy.get('iframe[name="frame_6"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe4 = cy.wrap($body)
            stripe4.find('.flow.parameter-wrapper > :nth-child(10) > div > select').select('pageable/pdf')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_6"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe5 = cy.wrap($body)
            stripe5.find('.flow.parameter-wrapper > :nth-child(10) > div > select').select('table/html;page-mode=stream')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_6"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe6 = cy.wrap($body)
            stripe6.find('.flow.parameter-wrapper > :nth-child(10) > div > select').select('table/excel;page-mode=flow')
           this.getViewReport()
          })
          cy.get('iframe[name="frame_6"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe7 = cy.wrap($body)
            stripe7.find('.flow.parameter-wrapper > :nth-child(10) > div > select').select('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;page-mode=flow')
           this.getViewReport()
          })
          cy.get('iframe[name="frame_6"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe8 = cy.wrap($body)
            stripe8.find('.flow.parameter-wrapper > :nth-child(10) > div > select').select('table/csv;page-mode=stream')
           this.getViewReport()
          })     
    }
    getServiceChargeReport()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[title="ServiceChargeReport.prpt"]').click()
      })
      this.getopenbtn()
      cy.wait(10000)
        cy.get('iframe[name="frame_7"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe4 = cy.wrap($body) 
            stripe4.find('.flow.parameter-wrapper > :nth-child(14) > div > select').select('pageable/pdf')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_7"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe6 = cy.wrap($body)
            stripe6.find('.flow.parameter-wrapper > :nth-child(14) > div > select').select('table/excel;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_7"]').then($element => {        
            const $body = $element.contents().find('body')       
            let stripe7 = cy.wrap($body)
            stripe7.find('.flow.parameter-wrapper > :nth-child(14) > div > select').select('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;page-mode=flow')
           this.getViewReport()
          })
    }
    getStockManagementReport()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[title="StockManagementReport.prpt"]').click()
      })
      this.getopenbtn()
      cy.wait(10000)
        cy.get('iframe[name="frame_8"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe4 = cy.wrap($body)       
            stripe4.find('.flow.parameter-wrapper > :nth-child(8) > div > select').select('pageable/pdf')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_8"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe5 = cy.wrap($body)
            stripe5.find('.flow.parameter-wrapper > :nth-child(8) > div > select').select('table/html;page-mode=stream')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_8"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe6 = cy.wrap($body)
            stripe6.find('.flow.parameter-wrapper > :nth-child(8) > div > select').select('table/excel;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_8"]').then($element => {
            const $body = $element.contents().find('body')       
            let stripe7 = cy.wrap($body)
            stripe7.find('.flow.parameter-wrapper > :nth-child(8) > div > select').select('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;page-mode=flow')
            this.getViewReport()
          })         
          cy.get('iframe[name="frame_8"]').then($element => {       
            const $body = $element.contents().find('body')
            let stripe8 = cy.wrap($body)
            stripe8.find('.flow.parameter-wrapper > :nth-child(8) > div > select').select('table/csv;page-mode=stream')
            this.getViewReport()
          })
    }
    getUserTransactionReport()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[title="UserTransactionReport.prpt"]').click()
      })
      this.getopenbtn()
      cy.wait(10000)
        cy.get('iframe[name="frame_9"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe4 = cy.wrap($body)
            stripe4.find('.flow.parameter-wrapper > :nth-child(17) > div > select').select('pageable/pdf')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_9"]').then($element => {        
            const $body = $element.contents().find('body')
            let stripe5 = cy.wrap($body)
            stripe5.find('.flow.parameter-wrapper > :nth-child(17) > div > select').select('table/html;page-mode=stream')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_9"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe6 = cy.wrap($body)
            stripe6.find('.flow.parameter-wrapper > :nth-child(17) > div > select').select('table/excel;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_9"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe7 = cy.wrap($body)
            stripe7.find('.flow.parameter-wrapper > :nth-child(17) > div > select').select('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;page-mode=flow')
            this.getViewReport()
          })
          cy.get('iframe[name="frame_9"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe8 = cy.wrap($body)
            stripe8.find('.flow.parameter-wrapper > :nth-child(17) > div > select').select('table/csv;page-mode=stream')
            this.getViewReport()
          })
    }
}
export default ReportingSuite