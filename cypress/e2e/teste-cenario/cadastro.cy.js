describe('Fazer Cadastro', ()=> {
    beforeEach(()=> {
        // Com o objetivo de visitar a mesma URL no início de todos os testes, 
        // incluímos essa ação na nossa função beforeEach, para que ela seja executada antes de cada teste.
        cy.visit('/')
    })

    it('Cadastro de um novo usuário válido', () => {
        // Dado que estou na página de cadastro da Amazon
        // Quando preencher os campos obrigatórios corretamente
        // E clicar no botão "Cadastrar"
        // Então devo ser redirecionado para a página inicial logado como usuário
        // E devo receber uma mensagem de confirmação de cadastro

        cy.get('#nav-link-accountList > .nav-line-2').click()
        cy.get('#createAccountSubmit').click()
        cy.get('#ap_customer_name').type('usuario')//insira o nome
        cy.get('#ap_email').type('teste@gmail.com')//insira o usuario
        cy.get('#ap_password').type('123')//insira senha
        cy.get('.a-alert-inline-info > .a-box-inner > .a-alert-content').should('contain.text', 'As senhas devem ter pelo menos 6 caracteres.')
        cy.get('#ap_password_check').type('123')//repita a senha
        cy.get('#continue').click()
        cy.wait(15000)
        cy.get('#cvf-input-code').type('7972534')// Substitua código de verificação pelo que foi enviado para o email
        cy.get('#cvf-submit-otp-button > .a-button-inner > .a-button-input').click()
        cy.get('#glow-ingress-line1').should('contain.text', 'Óla')
    })

    it.only('Cadastro de um novo usuário com e-mail já existente', () => {
        // Dado que estou na página de cadastro da Amazon
        // Quando preencher os campos obrigatórios 
        // E o e-mail já estiver registrado no sistema
        // E clicar no botão "Cadastrar"
        // Então devo ver uma mensagem de erro informando que o e-mail já está em uso

        cy.get('#nav-link-accountList > .nav-line-2').click()
        cy.get('#createAccountSubmit').click()
        cy.get('#ap_customer_name').type('usuario')//insira o nome
        cy.get('#ap_email').type('teste@gmail.com')//insira o usuario
        cy.get('#ap_password').type('123')//insira senha
        cy.get('.a-alert-inline-info > .a-box-inner > .a-alert-content').should('contain.text', 'As senhas devem ter pelo menos 6 caracteres.')
        cy.get('#ap_password_check').type('M@lu2018')//repita a senha
        cy.get('#continue').click()
        cy.get('.a-spacing-large > .a-box > .a-box-inner > .a-alert-heading').should('contain.text', 'O endereço de e-mail já está sendo utilizado')
    })


    it('Cadastro de um novo usuário com campos em branco', () => {
        // Dado que estou na página de cadastro da Amazon
        // Quando deixar os campos obrigatórios em branco
        // E clicar no botão "Cadastrar"
        // Então devo ver mensagens de erro indicando que os campos são obrigatórios
        // E não devo ser redirecionado para a página inicial logado como usuário

        cy.get('#nav-link-accountList > .nav-line-2').click()
        cy.get('#createAccountSubmit').click()
        cy.get('#continue').click()
        cy.get('#auth-customerName-missing-alert > .a-box-inner > .a-alert-content')
        .should('contain.text', 'Insira seu nome')
        cy.get('#auth-email-missing-alert > .a-box-inner > .a-alert-content')
        .should('contain.text', 'Digite seu e-mail ou número de telefone celular')
        cy.get('#auth-password-missing-alert > .a-box-inner > .a-alert-content')
        .should('contain.text', 'Mínimo de 6 caracteres necessários')
        

    })

    it('Cadastro de um novo usuário com senha mínima', () => {
        // Dado que estou na página de cadastro da Amazon
        // Quando preencher os campos obrigatórios corretamente, exceto o campo de senha que tem menos 6 caracteres
        // E clicar no botão "Cadastrar"
        // Então devo ver uma mensagem de erro informando que o mínimo de 6 caracteres necessários
        // E não devo ser redirecionado para a página de verificação de código

        cy.get('#nav-link-accountList > .nav-line-2').click()
        cy.get('#createAccountSubmit').click()
        cy.get('#ap_customer_name').type('usuario')
        cy.get('#ap_email').type('teste@gmail.com')
        cy.get('#ap_password').type('12')
        cy.get('.a-alert-inline-info > .a-box-inner > .a-alert-content').should('contain.text', 'As senhas devem ter pelo menos 6 caracteres.')
        cy.get('#ap_password_check').type('12')
        cy.get('#continue').click()
        cy.get('#auth-password-invalid-password-alert > .a-box-inner > .a-alert-content')
        .should('contain.text', 'Mínimo de 6 caracteres necessários')
    })

    it('Cadastro de um novo usuário com formato de e-mail inválido', () => {
        // Dado que estou na página de cadastro da Amazon
        // Quando preencher os campos obrigatórios corretamente, exceto o campo de e-mail que está em um formato inválido
        // E clicar no botão "Cadastrar"
        // Então devo ver uma mensagem de erro informando que o formato do e-mail é inválido
        // E não devo ser redirecionado para a página inicial logado como usuário

        cy.get('#nav-link-accountList > .nav-line-2').click()
        cy.get('#createAccountSubmit').click()
        cy.get('#ap_customer_name').type('usuario')
        cy.get('#ap_email').type('teste@.com')
        cy.get('#ap_password').type('123')
        cy.get('.a-alert-inline-info > .a-box-inner > .a-alert-content').should('contain.text', 'As senhas devem ter pelo menos 6 caracteres.')
        cy.get('#ap_password_check').type('123')
        cy.get('#continue').click()
        cy.get('#auth-email-invalid-claim-alert > .a-box-inner > .a-alert-content')
        .should('contain.text', 'Endereço de e-mail ou número de telefone celular errado ou inválido. Corrija e tente novamente.')

    })

  
})    
