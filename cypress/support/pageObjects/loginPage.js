class loginPage{

    getiFrame(){
        return cy.frameLoaded('.fd-page.iframeContainer.svelte-1v5e28n > iframe')
        
    }

    getInputForm(){
        return cy.iframe().find('.form-input')
    }
    getchangepasswordmessage()
    {
        return cy.iframe().find('p.text-content')
    }
    getLoginBtn(){
        return cy.iframe().find('.login-btn')
    }
    getchangepassword(){
        return cy.iframe().find('button[class="change-password-btn"]')
    }
    getloginbtn1()
    {
        return cy.iframe().find('.login-btn-modal')
    }
    getUserLoginMessage()
    {
        return cy.iframe().find('div.snackbar:nth-child(1) > span:nth-child(2)')
    }

}
export default loginPage