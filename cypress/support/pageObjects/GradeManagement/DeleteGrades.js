class DeleteGrades {

  getDeleteBttn() {
    return cy.iframe().find('#deleteGrades_delete_submit')
  }
  getDeleteConfirm() {



    cy.wait(6000)



    return cy.get('.fd-page.iframeContainer.svelte-1v5e28n > iframe').then(($iframe) => {



      const $body = $iframe.contents().find('body')



      const $win = $iframe[0].contentWindow





      cy.stub($win, 'confirm', () => true)



        .as('windowConfirm')



      cy.stub($win.console, 'log').as('consoleLog')





      cy.wrap($body)

        .find('#delconfirm_submit').click()

        .should(function () {



          expect(this.windowConfirm).to.be.calledWith('Are you sure, Grade will be deleted')
        //  expect(this.consoleLog).to.be.calledWith('CONFIRMED')  // passes

        })
    })

  }
  
  getDeleteRecord() {

    cy.readFile('cypress/fixtures/userData/Gradedata.json').then((user) => {
      let Grad = user.GradeName
      cy.log(Grad)


      return cy.iframe().find('#deleteGrades_delete .wwFormTableC>tbody>tr', '{force:true}').each(($row => {
        cy.wrap($row).within(function () {
          cy.get('td').each(($el => {

            if ($el.text() == Grad) {
              cy.get('[type="checkbox"]').click()
            }
          }))
        })
      }))
    })
  }




}
export default DeleteGrades