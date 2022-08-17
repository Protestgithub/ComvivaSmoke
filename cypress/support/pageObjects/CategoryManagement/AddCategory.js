class AddCategory{

    getCategoryName(){
        return  cy.iframe().find('#newCategory')
    }
    
    getCategoryCode(){
        return  cy.iframe().find('#newCategoryCode')
    }
    getDomainName(){
        return  cy.iframe().find('select[id="domainCode"]')
    }
    getParentCategory(){
        return   cy.iframe().find('select[id="categoryCode"]')
    }
    getCategorySubmit(){
        return cy.iframe().find("#addcat_button_submit")
    }
    getConfirmbttn(){
        return cy.iframe().find('#addcat_conf')
    }
    getApprovalCategory(){
        return cy.iframe().find('#catapp_label_button_approve')
    }
    getAllCheckBox(){

        return cy.iframe().find('.wwFormTableC tbody>tr').within(function(){
    
            cy.get('td').within(function(){
    
            cy.get('[type="checkbox"]').eq(0).click({force:true})
    
            })
    
            cy.wait(6000)
            cy.get('input[id="wallet_button_next"]').click({force:true})
            cy.wait(4000)
          })
    
    }
    
    getFinalSubmit(){
    
        cy.iframe().find('.wwFormTableC tbody>tr').within(function(){
    
            cy.get('td').within(function(){
    
            cy.get('[type="checkbox"]').eq(0).click({force:true})
    
            })
    
            cy.wait(4000)
    
            cy.get('td').within(function(){
    
            cy.get("input[type='submit']").eq(0).click()
    
            })
    
          })
    }
}
    export default AddCategory