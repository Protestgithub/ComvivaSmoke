class homePage {

    getUserMenu() {
        return cy.get('.fd-shellbar__button--user-menu > button')
    }

    getWelcomeText() {
        return cy.iframe().get('.fd-menu > ul > li > span')
    }

    getUserManagementOption() {

        return cy.get('[data-testid="menu.user_management"]')
    }

    getRegisterOption() {
        return cy.get('[data-testid="menu.user_management"]').find('[title="Register"]')
    }
    getSessionManagementOption(){

        return cy.get('[data-testid="menu.session_management"]')
    
    }
    
    getmysessionoption(){
    
        return cy.get('[title="My Sessions"]')
    
    }
    
    getAllSessionsOption(){
    
        return cy.get('[title="All Sessions"]')
    
    }
    getApprovalTab() {
        return cy.get('#collapsible_listnode_18 > .fd-nested-list__title')
    }
    getApprovalButtonTab() {
        return cy.get('[data-testid="menu.ums_approvals"] > .fd-nested-list > :nth-child(1) > [data-testid="test-undefined"]')
    }    
    getLogoutButton() {

        return cy.get('a[data-testid="logout-link"]')
    }
    getConfirmLogout() {
        return cy.get('[data-testid="luigi-modal-confirm"]')
    }
    getManageUsersLink() {
        return cy.get('[data-testid="menu.user_management"]').find('[title="Manage Users"]')
    }
    getPricingEngineLink() {
        return cy.get('[title="Pricing Engine"]')
    }
    getSecurityLink() {
        return cy.get('[title="Security"]')
    }
    getSecurityProfileLink() {
        return cy.get('[title="Security Profile"]')
    }
    getregulatoryprofile() {
        return cy.get('[data-testid="menu.user_management"]').find('[title="Regulatory Profile"]')
    }
    getmarketingprofile() {
        return cy.get('[data-testid="menu.user_management"]').find('[title="Marketing Profile"]')
    }

    getStockManagementOption() {
        return cy.get('a[title="Stock Management"]')
    }
    getStockInitiationOption() {
        return cy.get('a[title="Stock Initiation"]')
    }
    getStockTransferEAInitiation() {
        return cy.get('a[title="Stock Transfer to EA Initiation"]')
    }

    getApproval_1Option() {
        return cy.get('a[title="Stock Approval-1"]')
    }
    getApproval_2Option() {
        return cy.get('a[title="Stock Approval-2"]')
    }
    getRegisterOption() {
        return cy.get('[data-testid="menu.user_management"]').find('[title="Register"]')
    }

    getLogoutButton() {

        return cy.get('a[data-testid="logout-link"]')
    }
    getLogoutYesButton() {
        return cy.get('button[data-testid="luigi-modal-confirm"]')
    }
    getConfirmLogout() {
        return cy.get('[data-testid="luigi-modal-confirm"]')
    }
    getManageUsersLink() {
        return cy.get('[data-testid="menu.user_management"]').find('[title="Manage Users"]')
    }
    getMyActivity() {
        return cy.get('a[title="My Activity"]')
    }


    getTransferRuleOption() {
        return cy.get('[data-testid="menu.trules"]')
    }
    getTransferRule() {
        return cy.get('[data-testid="menu.trules"] > .fd-nested-list > :nth-child(1) > [data-testid="test-undefined"] > .fd-nested-list__title')

    }
    getDomainManagementOption() {
        return cy.get('[data-testid="test-DOMMANAGE"] > .fd-nested-list__title')
    }

    getTransferControlProfile() {
        return cy.get('[data-testid="menu.tcprofile"]')
    }
    getManageInstrumentLevelTCP() {
        return cy.get('[data-testid="menu.tcprofile"]').find('[title="Manage Instrument Level TCP"]')
    }
    getInstrumentLevelTCPApproval() {
        return cy.get('[data-testid="menu.tcprofile"]').find('[title="Instrument Level TCP Approval"]')
    }
    getTransferRuleApproval() {
        return cy.get('[data-testid="menu.trules"] > .fd-nested-list > :nth-child(3) > [data-testid="test-undefined"] > .fd-nested-list__title')
    }
    getO2CTransferRule() {
        return cy.get('[data-testid="menu.trules"] > .fd-nested-list > :nth-child(2) > [data-testid="test-undefined"]')
    }

    getO2CTransferInitiateOption() {
        return cy.get('a[title="Operator to Channel Transfer Initiate"]')
    }
    getOperatorToChannelOption() {
        return cy.get('#collapsible_listnode_1')

    }
    getProfileIcon() {
        return cy.get('.fd-user-menu div div div button[aria-expanded="false"]')
    }
    getLogOutbttn() {
        return cy.get('a[data-testid="logout-link"]')
    }
    getLogOutYesbttn() {
        return cy.get('button[data-testid="luigi-modal-confirm"]')
    }
    getOperatorToChannelApproval1() {
        return cy.get('[data-testid="menu.o2ctrf"] > .fd-nested-list > :nth-child(2) > [data-testid="test-undefined"]')
    }

    getOperatorToChannelApproval2() {
        return cy.get('[data-testid="menu.o2ctrf"] > .fd-nested-list > :nth-child(3) > [data-testid="test-undefined"] > .fd-nested-list__title')
    }

    getAmbiguousOrderTransacation() {
        return cy.get('#collapsible_listnode_14')
    }
    getDownloadAmbiguousOrder() {
        return cy.get('[data-testid="menu.ambgormng"] > .fd-nested-list > :nth-child(1) > [data-testid="test-undefined"]')
    }
    getBulkSettlement() {
        return cy.get('[data-testid="menu.ambgormng"] > .fd-nested-list > :nth-child(2) > [data-testid="test-undefined"]')

    }

    getExchangeRateManagementOption() {
        return cy.get('[data-testid="menu.exratesvc"]')
    }
    getAddExchangeRate() {
        return cy.get('[data-testid="menu.exratesvc"] > .fd-nested-list > :nth-child(1) > [data-testid="test-undefined"] > .fd-nested-list__title')
    }
    getApproveRejectER() {
        return cy.get('[data-testid="menu.exratesvc"] > .fd-nested-list > :nth-child(2) > [data-testid="test-undefined"]')
    }
    getShowModificationHistory() {
        return cy.get('[data-testid="menu.exratesvc"] > .fd-nested-list > :nth-child(6) > [data-testid="test-undefined"]')
    }
    getUpdateER() {
        return cy.get('[data-testid="menu.exratesvc"] > .fd-nested-list > :nth-child(3) > [data-testid="test-undefined"]')
    }
    getApproveupdateER() {
        return cy.get('[data-testid="menu.exratesvc"] > .fd-nested-list > :nth-child(4) > [data-testid="test-undefined"]')
    }
    getDomainManagementOption() {
        return cy.get('[data-testid="test-DOMMANAGE"] > .fd-nested-list__title')
    }
    getCategoryManagementOption() {
        return cy.get('#collapsible_listnode_10')
    }
    getAddCategory() {
        return cy.get('[data-testid="menu.catadd"] > .fd-nested-list > :nth-child(1) > [data-testid="test-undefined"] > .fd-nested-list__title')
    }
    getViewCategory() {
        return cy.get('[data-testid="menu.catadd"] > .fd-nested-list > :nth-child(2) > [data-testid="test-undefined"] > .fd-nested-list__title')
    }
    getCAtegoryApprovalOption() {
        return cy.get('[data-testid="test-CAT_APPRL"] > .fd-nested-list__title')
    }
    getUserprofileManagementOption() {

        return cy.get('#collapsible_listnode_3')

    }

    getADDGrades() {
        return cy.get('[data-testid="menu.chgrades"] > .fd-nested-list > :nth-child(1) > [data-testid="test-undefined"] > .fd-nested-list__title')
    }
    getModifyGrades() {
        return cy.get('[data-testid="menu.chgrades"] > .fd-nested-list > :nth-child(2) > [data-testid="test-undefined"] > .fd-nested-list__title')
    }
    getOperatorToChannelApproval2() {
        return cy.get('[data-testid="menu.o2ctrf"] > .fd-nested-list > :nth-child(3) > [data-testid="test-undefined"] > .fd-nested-list__title')
    }
    getDeleteGrades() {
        return cy.get(':nth-child(3) > [data-testid="test-undefined"]')
    }
    getChurnManagement() {
        return cy.get('[data-testid="menu.churnmgmt"]')
    }
    getChurnInitiation() {
        return cy.get('[data-testid="menu.churnmgmt"]').find('[title="Churn Initiation"]')
    }
    getChurnApproval() {
        return cy.get('[data-testid="menu.churnmgmt"]').find('[title="Churn Approval"]')
    }
    getTransactionCorrection() {

        return cy.get('[data-testid="menu.txn_corr"]')

    }

    getreconcilationpage() {

        return cy.get('[data-testid="test-MNREC"]')

    }

    getTransactionCorrectionApproval() {

        return cy.get('[data-testid="menu.txn_corr"]').find('[title="Transaction Correction Approval"]')

    }
    getMarketingProfileLink() {

        return cy.get('[data-testid="menu.user_management"]').find('[title="Marketing Profile"]')

    }
    getTransferControlProfileSA()
{
    return cy.get('[data-testid="test-TCPROFILE"]')
}
getBankingChannelActivation() {

        return cy.get('[title="Banking Channel Activation"]')

    }
}
export default homePage