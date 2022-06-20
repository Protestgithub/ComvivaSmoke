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
        cy.wait(5000)
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
      stripe.find('[id="ae0b0f7f-b4fe-4478-b4ab-94a49e1f94a5"]').click()
      })
    }
    getopenbtn()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[id="openButton"]').click()
      })
    }
    getCustomerRegistrationReport()
    {
      cy.get('.gwt-Frame').then($element => {
        const $body = $element.contents().find('body')
        let stripe = cy.wrap($body)
        stripe.find('[id="2f59e860-aec6-40a4-abd9-43af81fda034"]').click()
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
        stripe.find('[id="4724b667-5b2b-4e59-9e42-4ddc41f07d6b"]').click()
      })
      this.getopenbtn()
      cy.wait(10000)
        cy.get('iframe[name="frame_1"]').then($element => {
            const $body = $element.contents().find('body')
            let stripe4 = cy.wrap($body)
            stripe4.find('.flow.parameter-wrapper > :nth-child(5) > div > select').select('pageable/pdf')
            this.getViewReport()
          })
          /*
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
          }) */         
    }
    getCustomerBlockedAccess()
    {
          cy.get('.gwt-Frame').then($element => {
            const $body = $element.contents().find('body')
            let stripe = cy.wrap($body)
            stripe.find('[id="92bf402b-dcbf-4eba-83d4-ced13c68dc38"]').click()
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
        stripe.find('[id="a5f67939-3bbe-4225-8526-2543a47ba193"]').click()
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
        stripe.find('[id="2086e491-faa3-4391-a650-cabc1a2e6879"]').click()
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
        stripe.find('[id="b68ee790-ce75-47ec-b7a4-d6ada6378a92"]').click()
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
        stripe.find('[id="a71db4f3-5c9c-4548-944c-f468418d05ee"]').click()
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
        stripe.find('[id="35a649b7-c9de-43ba-8ecc-11f937622d88"]').click()
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
        stripe.find('[id="6a576cdc-b3e2-4c9c-bb9e-38f1b8e1d43c"]').click()
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
        stripe.find('[id="bd2535f0-f1d7-4e22-a302-e0be597ac135"]').click()
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