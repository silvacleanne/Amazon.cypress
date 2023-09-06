
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

        cy.get('#nav-link-accountList').trigger('mouseover').click()
        cy.get('#createAccountSubmit').click() 
        cy.get('#ap_customer_name').type('name')//insira o nome
        cy.get('#ap_email').type('email')//insira o usuario
        cy.get('#ap_password').type('password')//insira senha
        cy.get('#ap_password_check').type('password_check')//repita a senha
        cy.get('#continue').click()
        cy.wait(15000)

        // Insira o código de verificação enviado para o email manualmente na pagina de verificação de endereço
        cy.get('#cvf-submit-otp-button > .a-button-inner > .a-button-input').click()
        cy.get('#glow-ingress-line1').should('contain.text', 'Óla')
    })

    it('Cadastro de um novo usuário com e-mail já existente', () => {
        // Dado que estou na página de cadastro da Amazon
        // Quando preencher os campos obrigatórios 
        // E o e-mail já estiver registrado no sistema
        // E clicar no botão "Cadastrar"
        // Então devo ver uma mensagem de erro informando que o e-mail já está em uso

        cy.get('#nav-link-accountList').trigger('mouseover').click()
        cy.get('#createAccountSubmit').click() 
        cy.get('#ap_customer_name').type('Cle')//insira o nome
        cy.get('#ap_email').type('teste@gmail.com')//insira o usuario
        cy.get('#ap_password').type('123')//insira senha
        cy.get('#ap_password_check').type('123')//repita a senha
        cy.get('#continue').click()
        
        cy.contains('Já existe uma conta com esse e-mail').should('be.visible')
    })


    it('Cadastro de um novo usuário com campos em branco', () => {
        // Dado que estou na página de cadastro da Amazon
        // Quando deixar os campos obrigatórios em branco
        // E clicar no botão "Cadastrar"
        // Então devo ver mensagens de erro indicando que os campos são obrigatórios
        // E não devo ser redirecionado para a página inicial logado como usuário

        cy.get('#nav-link-accountList').trigger('mouseover').click()
        cy.get('#createAccountSubmit').click()
        cy.get('#continue').click()
        cy.contains('Insira seu nome').should('be.visible')
        cy.contains('Digite seu e-mail ou número de telefone celular').should('be.visible')
        cy.contains('Mínimo de 6 caracteres necessários').should('be.visible')
                
    })

    it('Cadastro de um novo usuário com senha mínima', () => {
        // Dado que estou na página de cadastro da Amazon
        // Quando preencher os campos obrigatórios corretamente, exceto o campo de senha que tem menos 6 caracteres
        // E clicar no botão "Cadastrar"
        // Então devo ver uma mensagem de erro informando que o mínimo de 6 caracteres necessários
        // E não devo ser redirecionado para a página de verificação de código

        cy.get('#nav-link-accountList').trigger('mouseover').click()
        cy.get('#createAccountSubmit').click()
        cy.get('#ap_customer_name').type('Cle')//insira o nome
        cy.get('#ap_email').type('teste@gmail.com')//insira o usuario
        cy.get('#ap_password').type('123')//insira senha
        cy.get('#ap_password_check').type('123')//repita a senha
        cy.get('#continue').click()
        cy.contains('Mínimo de 6 caracteres necessários').should('be.visible')
    })

    it('Cadastro de um novo usuário com formato de e-mail inválido', () => {
        // Dado que estou na página de cadastro da Amazon
        // Quando preencher os campos obrigatórios corretamente, exceto o campo de e-mail que está em um formato inválido
        // E clicar no botão "Cadastrar"
        // Então devo ver uma mensagem de erro informando que o formato do e-mail é inválido
        // E não devo ser redirecionado para a página inicial logado como usuário

        cy.get('#nav-link-accountList').trigger('mouseover').click()
        cy.get('#createAccountSubmit').click()
        cy.get('#ap_customer_name').type('Cle')//insira o nome)
        cy.get('#ap_email').type('teste@.com')
        cy.get('#ap_password').type('123')//insira senha
        cy.get('#ap_password_check').type('123')//repita a senha
        cy.get('#continue').click()
        cy.contains('Endereço de e-mail ou número de telefone celular errado ou inválido. Corrija e tente novamente.')
        .should('be.visible')

    })

    it('Senhas inserida não coincidem', () => {
        // Dado que estou na página de cadastro da Amazon
        // Quando preencher os campos obrigatórios corretamente, mas preencho as senhas diferente
        // E clicar no botão "Cadastrar"
        // Então devo ver uma mensagem de erro informando que as senhas não coincidem
        // E não devo ser redirecionado para a página de verificação de código

        cy.get('#nav-link-accountList').trigger('mouseover').click()
        cy.get('#createAccountSubmit').click()
        cy.get('#ap_customer_name').type('Cle')//insira o nome)
        cy.get('#ap_email').type('teste@gmail.com')
        cy.get('#ap_password').type('123')//insira senha
        cy.get('#ap_password_check').type('P@ssei')//repita a senha
        cy.get('#continue').click()
        cy.contains('As senhas não são iguais').should('be.visible')

    })

    it.only('Preenchimento com email e senha inválidos', () => {
        // Dado que estou na página de cadastro da Amazon
        // Quando preencher os campos de email e senha inválidos
        // E clicar no botão "Cadastrar"
        // Então devo ver uma mensagem de erro informando que email e senha estão inválidos
        // E não devo ser redirecionado para a página de verificação de código

        cy.get('#nav-link-accountList').trigger('mouseover').click()
        cy.get('#createAccountSubmit').click()
        cy.get('#ap_customer_name').type('Cle')//insira o nome)
        cy.get('#ap_email').type('testegmail.com')
        cy.get('#ap_password').type('....')//insira senha
        cy.get('#ap_password_check').type('....')//repita a senha
        cy.get('#continue').click()
        cy.contains('Endereço de e-mail ou número de telefone celular errado ou inválido. Corrija e tente novamente.')
        .should('be.visible')
    })

  
})    
