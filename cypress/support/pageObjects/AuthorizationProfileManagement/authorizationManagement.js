class authorizationManagement {
    getAuthorizationProfileManagement() {
        return cy.get('[data-testid="test-AUTH_PROFILE"]')
    }
    getApprovals() {
        return cy.get('#collapsible_listnode_18 > .fd-nested-list__title')
    }
    getApprovalButtonTab() {
        return cy.get('[data-testid="menu.approvals"] > .fd-nested-list > :nth-child(1) > [data-testid="test-undefined"]')
    } 


    getAddProfile() {
        return cy.iframe().find('[id="add-profile"]')
    }

    getApproveButton() {
        return cy.iframe().find('.mat-focus-indicator.btn.btn-rounded.button-approve.mat-button.mat-button-base.ng-star-inserted').eq(0)
    }

    getApproveButtonSubmit() {
        return cy.iframe().find('.mat-focus-indicator.btn-rounded.button-primary.button-short.mat-button.mat-button-base')
    }

    getAuthorizationUserType() {
        return cy.iframe().find('.nav-item.ng-star-inserted > a').contains('Subscriber')
    }
    getAuthorizationUserRole() {
        return cy.iframe().find('.mat-radio-label-content')
    }
    getProfileName() {
        return cy.iframe().find('input[id="profile-name"]')
    }
    getLogoutButton() {
        return cy.iframe().find('.fd-menu__title').eq(2)
    }
    getApproveConfirmationMessage() {

        return cy.iframe().find('.mat-simple-snackbar.ng-star-inserted > span')

    }
    getLogoutYesButton() {
        return cy.iframe().find('.fd-dialog__decisive-button.fd-button.fd-button--emphasized.fd-button--compact.confirm-button')
    }

    getUserMenu() {
        return cy.iframe().find('.fd-shellbar__button.fd-button.fd-identifier.fd-identifier--xs.fd-identifier--circle.svelte-1jh0v0i')

    }
    getChannelsAllowed1() {
        //return cy.iframe().find('input[id="channels-allowed-3-input"]')
        return cy.iframe().find('div.col-12 app-default.ng-star-inserted > div.container-fluid.ng-star-inserted')
    }

    getUserServicePreferences() {

        return cy.iframe().find('.mat-checkbox-label')

    }
    getChannelsAllowed2() {
        return cy.iframe().find('input[id="channels-allowed-9-input"]')
    }

    getUsersAllowedSubscriber1() {
        return cy.iframe().find('[id="users-allowed-subscriber-1-input"]')
    }
    getAdd() {
        return cy.iframe().find('[id="add"]')
    }
    getConfirm() {
        return cy.iframe().find('[id="confirm"]')
    }

    getProfileSuccessMessage() {
        return cy.iframe().find('[class="text-center text-secondary font-weight-700 mt-4 pt-1"]')
    }

    getProfileDoneButton() {
        return cy.iframe().find('[id="done"]')

    }

    getViewProfile() {
        return cy.iframe().find('[id="view-profile-detail-1"]')
        // return cy.iframe().find('.mat-table.cdk-table.mat-sort',"{force:true}")
    }

    getEditProfile() {
        return cy.iframe().find('.mat-icon.notranslate.viewProfileEditIcon.mat-icon-no-color')
    }

    getModifyProfile() {
        return cy.iframe().find('[id="modify"]')
    }
    getDeleteProfile() {
        return cy.iframe().find('[id="delete-profile-1"]')
    }

    getYesDeleteProfile() {
        return cy.iframe().find('[id="yes"]')
    }

    getModulesCheck() {
        return cy.iframe().find('[id="module-1"]')

    }
    getServicesCheck() {
        return cy.iframe().find('[id="privilege-1"]')

    }

    getViewProfileSuccess() {
        return cy.iframe().find('app-view-detail.ng-star-inserted:nth-child(3) app-page-link:nth-child(2) div.container-fluid.mt-3 div.row > div.col-12')
    }

    getViewProfileNameSuccess() {
        return cy.iframe().find('font-weight-700 ng-star-inserted')
    }
    getViewProfileModifySuccess() {
        return cy.iframe().find('.text-center.text-secondary.font-weight-700.mt-4.pt-1')
    }
    getViewProfileModifyDone() {
        return cy.iframe().find('[id="done"]')
    }

    getViewProfileDeleteSuccess() {
        return cy.iframe().find('.mat-simple-snackbar.ng-star-inserted')
    }

    getAllModules() {
        return cy.iframe().find('.row.mt-2.profile-list-container div')

    }


    // ------------------Administrator---------------

    getAdministratorType() {
        return cy.iframe().find('.nav-item.ng-star-inserted > a').contains('Administrator')
    }

    getAdministratorBusinessAdmin() {
        return cy.iframe().find('.mat-radio-label-content')
    }

    getBusinessType() {
        return cy.iframe().find('.nav-item.ng-star-inserted > a').contains('Business')
    }

    getBusinessATMRole() {
        return cy.iframe().find('.mat-radio-label-content')
    }

    getProfileNameExist(){
        return cy.iframe().find('.text-center.text-secondary.font-weight-700.mt-4.pt-1').contains
        ('Authorization profile name already exists,please try with different name')
    }

   
}
export default authorizationManagement