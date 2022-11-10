class AddGrades{

    getAddbttn(){
        return cy.iframe().find('#grades_addGrades_submit')
    }
    getDomainName(){
        return cy.iframe().find('select[id="grades_addGrades_domainCode"]')
    }
    getCatergoryName(){
        return cy.iframe().find('select[id="grades_addGrades_categoryCode"]')
    }
    
    getgradeCode(){
        return cy.iframe().find('#grades_addGrades_gradeList_0__gradeCode')
    }
    getGradeName(){
        return cy.iframe().find('#grades_addGrades_gradeList_0__gradeName')
    }
    
    getSavebttn(){
        return cy.iframe().find('input[value="Save"]')
    }
    getConfirmbttn(){
        return cy.iframe().find('#grades_saveGrades_submit')
    }
    }
    export default AddGrades