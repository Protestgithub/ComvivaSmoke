class securityQuestion {
    // Navigate to security questions

    getSecurityQuestionOption() {

        return cy.get('[data-testid="menu.ums_security"]')
    }

    getSecurityOption() {

        return cy.get('[data-testid="menu.ums_security"]').find('[title="Security Question"]')
    }


    getAddQuestion() {

        return cy.iframe().find('[class="mat-focus-indicator btn btn-next btn-rounded ml-4 font-weight-700 text-uppercase mat-button mat-button-base ng-star-inserted"]')
    }

    getSearchBox() {

        return cy.iframe().find('input[id="question-0-0"]')
    }

    getAddButton() {

        return cy.iframe().find('[class="mat-focus-indicator btn btn-next btn-rounded ml-4 font-weight-700 text-uppercase mat-button mat-button-base"]')
    }

    getConfirmButton() {
        return cy.iframe().find('[class="mat-focus-indicator btn-next btn-rounded font-weight-700 ml-3 text-uppercase mat-button mat-button-base"]')
    }

    getMessage() {
        return cy.iframe().find('[class="text-center"]')

    }

    getDoneButton() {
        return cy.iframe().find('[class="btn btn-danger done mx-auto next-button"]')
    }

    getAddLanguage() {
        return cy.iframe().find('[class="mat-focus-indicator add-language-btn d-flex align-items-center mat-button mat-button-base"]')

    }

    getLanguageDropDown() {
        return cy.iframe().find('select[id="language-0-1"]> option', "{force:true}")
    }

    getLanguageDropDowns() {
        return cy.iframe().find('select[id="language-0-1"]', "{force:true}")
    }



    getLanguageSearchBox() {
        return cy.iframe().find('[class="form-control custom-select ng-touched ng-dirty ng-valid"]')

    }

    getOtherLanguageQuestion() {
        return cy.iframe().find('[id="question-0-1"]')

    }

    getAdd() {
        return cy.iframe().find('[class="mat-focus-indicator btn btn-next btn-rounded ml-4 font-weight-700 text-uppercase mat-button mat-button-base"]')

    }

    getConfirm() {
        return cy.iframe().find('[class="mat-focus-indicator btn-next btn-rounded font-weight-700 ml-3 text-uppercase mat-button mat-button-base"]')

    }

    getOtherLanguageSuccess() {
        return cy.iframe().find('[class="text-center"]')

    }

    getDoneOtherLanguage() {
        return cy.iframe().find('[class="btn btn-danger done mx-auto next-button"]')

    }

    getDefaultSystemLanguage() {
        return cy.iframe().find('[id="language-0-0"]')

    }

}
export default securityQuestion