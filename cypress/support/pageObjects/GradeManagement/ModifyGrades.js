class ModifyGrades{

  getFirstRadio(){
    return cy.iframe().find("#modifyGrades_modify_check").eq(0)
}
getFirstData(){
    return cy.iframe().find("#modifyGrades_modify_gradeName").eq(0)
}
getModifybttn(){
    return cy.iframe().find('input[value="Modify"]')
}
getConfirmbttn(){
    return cy.iframe().find('#modifyGrades_modify_submit')
}
getsuccessMsg(){
  return cy.iframe().find('.actionMessage')
}
getModifyTable(){
  return cy.iframe().find('#modifyGrades_modify .wwFormTableC>tbody>tr','{force:true}')
}
getCheckBox(){
  return cy.get('[type="checkbox"]')
}
getModData(){
  return  cy.get('#modifyGrades_modify_gradeName')
}

getModifyRecord(){

    cy.readFile('cypress/fixtures/userData/Gradedata.json').then((user)  => {
      let Grad = user.GradeName
       cy.log(Grad)
      
  
    return cy.iframe().find('#modifyGrades_modify .wwFormTableC>tbody>tr','{force:true}').each(($row=>{
      cy.wrap($row).within(function(){
          cy.get('td').each(($el=>{
            
              if($el.text()==Grad){
                  cy.get('[type="checkbox"]').click()
                  cy.get('#modifyGrades_modify_gradeName').type(this.data01.ModifyGrade.Firstdata,{force:true})
              }
            }))
          })
        })) 
      })
        }
}
export default ModifyGrades