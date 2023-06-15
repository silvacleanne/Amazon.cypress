describe('Acessar o site da Amazon fazendo login', ()=> {
    beforeEach(()=> {
        // Com o objetivo de visitar a mesma URL no início de todos os testes, 
        // incluímos essa ação na nossa função beforeEach, para que ela seja executada antes de cada teste.
        cy.visit('/')
    })

    it('Login com credenciais válidas', () => {
        // Dado que eu esteja na página de login
        // E preencha o campo de email com "teste@gmail.com"
        // Quando eu clicar no botão "Continuar"
        // Então devo ser redirecionado para a página de senha
        // E preencha o campo de senha com "Senha"
        // Quando eu clicar no botão "Fazer login"
        // Então devo ser redirecionado para a página inicial

        cy.get('.nav-line-1-container').click()
        cy.get('#ap_email').type('teste@gmail.com') //inserir email 
        cy.get('.a-button-inner > #continue').click()
        cy.get('#ap_password').type('senha') //inserir senha
        cy.get('#signInSubmit').click()
        cy.get('#nav-link-accountList-nav-line-1').should('contain.text', 'Olá, Exemplo')
     
    })

    it('Login com email inválido', ( ) => {
       // Dado que eu esteja na página de login
       // E preencha o campo de email com "emailinválido"
       // Quando eu clicar no botão "Continuar"
       // Então devo ver a mensagem de erro "Houve um problema"

        
       cy.get('#nav-link-accountList > .nav-line-2').click()
       cy.get('#ap_email').type('teste@.com') //inserir senha inválido
       cy.get('.a-button-inner > #continue').click()
       cy.get('li').should('contain.text', 'Não encontramos uma conta associada a este endereço de e-mail')
      
    })

    it('Login com senha inválida', () => {
        // Dado que eu esteja na página de login
        // E preencha o campo de email com "teste@gmail.com"
        // Quando eu clicar no botão "Continuar"
        // E preencha o campo de senha com "senhainválida"
        // Quando eu clicar no botão "Fazer login"
        // Então devo ver a mensagem de erro "Sua senha está incorreta"

        cy.get('.nav-line-1-container').click()
        cy.get('#ap_email').type('teste@gmail.com') //inserir email
        cy.get('.a-button-inner > #continue').click()  
        cy.get('#ap_password').type('123') //inserir senha inválida
        cy.get('#signInSubmit').click()      
        cy.contains('.a-list-item', 'Sua senha está incorreta').should('be.visible')        

    })

    it('Login com o campo do email em branco', () => {
        // Dado que eu esteja na página de login
        // Quando deixar o campo obrigatório em branco
        // E clicar no botão "Continuar"
        // Então devo ver mensagens de erro indicando que o campo é obrigatório
        // E não devo ser redirecionado para a página de senha

        cy.get('.nav-line-1-container').click()
        cy.get('.a-button-inner > #continue').click()  
        cy.get('#auth-email-missing-alert > .a-box-inner > .a-alert-content').should('contain.text', 'Digite seu e-mail ou número de telefone celular')

    })
    
    it('Login o campo senha em branco', () => {
        // Dado que eu esteja na página de login
        // E preencha o campo de email com "teste@gmail.com"
        // E clicar no botão "Continuar"
        // Quando deixar o campo obrigatório em branco
        // E clicar no botão "Fazer login"
        // Então devo ver mensagens de erro indicando que o campo é obrigatório
        // E não devo ser redirecionado para a página inicial logado como usuário

        cy.get('.nav-line-1-container').click()
        cy.get('#ap_email').type('teste@gmail.com') //inserir email
        cy.get('.a-button-inner > #continue').click()
        cy.get('#signInSubmit').click()
        cy.get('#auth-password-missing-alert > .a-box-inner > .a-alert-content').should('contain.text', 'Insira sua senha')

    })
    

})
